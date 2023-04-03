import * as fs from 'fs';
import moment from 'moment';

const GENERATED_PATH = './generated/';
export const CHARTS_PATH = `${GENERATED_PATH}charts/`;
export const REPORTS_PATH = `${GENERATED_PATH}reports/`;

export function parseStringToNumber(numberString: string) {
    if (!numberString) {
        throw 'String is empty!';
    }
    return parseFloat(numberString.replace(',', '.').replace(' ', ''));
}

export function formatEpochToString(epochNumber: number) {
    return moment(epochNumber).format('DD/MM/YYYY');
}

export function createGeneratedFolders() {
    try {
        if (!fs.existsSync(GENERATED_PATH)) {
            fs.mkdirSync(GENERATED_PATH);
        }
    } catch (err) {
        console.error(err);
    }
    try {
        if (!fs.existsSync(REPORTS_PATH)) {
            fs.mkdirSync(REPORTS_PATH);
        }
    } catch (err) {
        console.error(err);
    }
    try {
        if (!fs.existsSync(CHARTS_PATH)) {
            fs.mkdirSync(CHARTS_PATH);
        }
    } catch (err) {
        console.error(err);
    }
}
