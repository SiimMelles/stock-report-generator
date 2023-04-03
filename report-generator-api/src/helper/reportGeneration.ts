import * as fs from 'fs';
import * as path from 'path';
import * as luxon from 'luxon';
import moment from 'moment';
import PDFDocument from 'pdfkit';
import { parse } from 'csv-parse';
import { ChartConfiguration, FinancialDataPoint } from 'chart.js';
import { finished } from 'stream/promises';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import 'chartjs-chart-financial';
import 'dompurify';
import IDatapoint from '../domain/datapoint';
import { CHARTS_PATH, formatEpochToString, parseStringToNumber, REPORTS_PATH } from '../helper/utils';

export async function generatePdf(requestId: string): Promise<void> {
    const records = await processCsv();

    await generateStockChart(records, requestId);

    // Simulate longer running request
    // await new Promise(r => setTimeout(r, 2000));

    const pdfDocument = new PDFDocument();
    pdfDocument.pipe(fs.createWriteStream(`${REPORTS_PATH}${requestId}.pdf`));
    pdfDocument.fontSize(25).text('Stock chart report', { align: 'center' });
    pdfDocument.fontSize(12).text(
        `For period ${formatEpochToString(Math.min(...records.map((rec) => rec.date)))} - ${formatEpochToString(
            Math.max(...records.map((rec) => rec.date))
        )}`,
        { align: 'center' }
    );
    pdfDocument.fontSize(12).text(`Lowest price during this period: ${Math.min(...records.map((rec) => rec.low))} ${records[0].currency}`, {
        align: 'center'
    });
    pdfDocument.fontSize(12).text(`Highest price during this period: ${Math.max(...records.map((rec) => rec.high))} ${records[0].currency}`, {
        align: 'center'
    });
    pdfDocument.image(`${CHARTS_PATH}${requestId}.png`, pdfDocument.page.width / 2 - 400 / 2, pdfDocument.y, { width: 400 });
    pdfDocument.end();
}

async function processCsv(): Promise<IDatapoint[]> {
    const csvFilePath = path.resolve(`public/test_data_${Math.floor(Math.random() * 2) + 1}.csv`);
    const headers = ['date', 'open', 'high', 'low', 'close', 'volume', 'currency'];

    const records: IDatapoint[] = [];
    const parser = fs.createReadStream(csvFilePath).pipe(
        parse({
            delimiter: ';',
            columns: headers
        })
    );

    parser.on('readable', function () {
        let record;
        while ((record = parser.read())) {
            try {
                const data: IDatapoint = {
                    date: moment.utc(record.date, 'DD.MM.YYYY').valueOf(),
                    open: parseStringToNumber(record.open),
                    high: parseStringToNumber(record.high),
                    low: parseStringToNumber(record.low),
                    close: parseStringToNumber(record.close),
                    volume: parseStringToNumber(record.volume),
                    currency: record.currency
                };
                records.push(data);
            } catch (exception) {
                console.log('One of the strings was empty, skipping entry'); // TODO: change to some logging tool
            }
        }
    });
    await finished(parser);
    return records;
}

async function generateStockChart(records: IDatapoint[], requestId: string): Promise<void> {
    const dataset = [];
    for (let i = 0; i < records.length; i += 1) {
        const datapoint = {
            x: records[i].date,
            o: records[i].open,
            h: records[i].high,
            l: records[i].low,
            c: records[i].close
        } as FinancialDataPoint;
        dataset.push(datapoint);
    }
    const configuration: ChartConfiguration = {
        type: 'candlestick',
        data: {
            datasets: [
                {
                    label: 'Stock price',
                    data: dataset
                }
            ]
        }
    };
    const width = 1000;
    const height = 1000;

    const chartJSNodeCanvas = new ChartJSNodeCanvas({
        width,
        height,
        plugins: {
            modern: ['chartjs-chart-financial'],
            globalVariableLegacy: ['chartjs-adapter-luxon']
        }
    });

    (global as any).window = (global as any).window || {};
    (global as any).window.luxon = luxon;
    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    await fs.promises.writeFile(`${CHARTS_PATH}${requestId}.png`, buffer, 'base64');
}
