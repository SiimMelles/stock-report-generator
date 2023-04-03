import express from 'express';
import { Request, Response } from 'express';
import { REPORTS_PATH } from '../helper/utils';
import controller from '../controller/reportController';

const router = express.Router();

export const REQUEST_REPORT = '/report';
export const GET_REPORT = '/report/:id';
export const DOWNLOAD_REPORT = '/report/download/:id';

router.get(REQUEST_REPORT, (req: Request, res: Response) => controller.requestReport(req, res));

router.get(GET_REPORT, (req: Request, res: Response) => controller.getReport(req, res));

router.get(DOWNLOAD_REPORT, (req, res) => res.download(`${REPORTS_PATH}${req.params.id}.pdf`));

export default router;
