import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { StyledHeader, StyledPaper } from './ReportGenerationStyledComponents';
import GenerateReportButton from './GenerateReportButton';
import ReportRequestStatus from './ReportRequestStatus';
import IRequestReport from '../../model/IRequest';
import IGetReport from '../../model/IGetReport';
import { ReportService } from '../../services/ReportService';

export default function Home() {
    const [request, setRequest] = useState(null as IRequestReport | null);
    const [report, setReport] = useState(null as IGetReport | null);
    const [stopInterval, setStopInterval] = useState(false as boolean);

    const handleClick = async () => {
        const reportRequest = await ReportService.requestReport();
        if (reportRequest !== null) {
            setRequest(reportRequest);
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | string | number | undefined;
        const callApi = async () => {
            const getReport = await ReportService.getReport(request!.requestId);
            setReport(getReport);

            if (getReport!.downloadLink !== 'pending') {
                clearInterval(intervalId);
                setStopInterval(true);
            }
        };

        if (request && !stopInterval) {
            intervalId = setInterval(callApi, 1000);
        }

        return () => clearInterval(intervalId);
    }, [request, stopInterval]);

    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={6} textAlign={'center'}>
                <StyledPaper elevation={0}>
                    <StyledHeader>Stock Report Generator</StyledHeader>
                    <GenerateReportButton request={request} handleClick={handleClick} isLoading={request !== null} />
                    <ReportRequestStatus report={report} request={request} stopInterval={stopInterval} />
                </StyledPaper>
            </Grid>
        </Grid>
    );
}
