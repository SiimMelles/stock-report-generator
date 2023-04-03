import * as fs from 'fs';
import { REPORTS_PATH } from '../helper/utils';
import { v4 as uuid } from 'uuid';
import { DOWNLOAD_REPORT, GET_REPORT } from '../route/reportRoute';
import IGetReport from '../domain/getReport';
import IRequestReport from '../domain/requestReport';
import { Request } from 'express';
import { generatePdf } from '../helper/reportGeneration';

function requestReport(request: Request): IRequestReport {
    const requestId = uuid();
    generatePdf(requestId);

    const result: IRequestReport = {
        status: 'Success',
        requestId,
        requestLink: new URL(`http://${request.get('host')}${request.baseUrl}${GET_REPORT}`.replace(':id', requestId)).toString()
    };
    return result;
}

function getReport(request: Request): IGetReport {
    const response: IGetReport = {} as IGetReport;
    response.requestId = request.params.id;

    if (!fs.existsSync(`${REPORTS_PATH}${request.params.id}.pdf`)) {
        response.status = 'Loading...';
        response.downloadLink = 'pending';
    } else {
        response.status = 'Done!';
        response.downloadLink = new URL(
            `http://${request.get('host')}${request.baseUrl}${DOWNLOAD_REPORT}`.replace(':id', request.params.id)
        ).toString();
    }
    return response;
}

export default { getReport, requestReport };
