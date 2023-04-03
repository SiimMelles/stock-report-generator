import { Request, Response } from 'express';
import IRequestReport from '../domain/requestReport';
import reportService from '../service/reportService';
import IGetReport from '../domain/getReport';

function requestReport(request: Request, response: Response) {
    const result: IRequestReport = reportService.requestReport(request);
    response.json({ ...result, url: `${request.get('host')}${request.baseUrl}${request.path}` });
}

function getReport(request: Request, response: Response) {
    const result: IGetReport = reportService.getReport(request);
    response.json({ ...result, url: `${request.get('host')}${request.baseUrl}${request.path}` });
}

export default { requestReport, getReport };
