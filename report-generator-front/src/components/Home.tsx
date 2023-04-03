import { Box, Collapse, Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import IRequestReport from '../model/IRequestReport';
import { StyledBodyText, StyledButton, StyledHeader, StyledPaper } from './StyledComponents';
import { ReportService } from '../services/ReportService';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IGetReport from '../model/IGetReport';

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

    const renderRequestStatus = () => {
        if (request?.status === 'Success') {
            return (
                <Box justifyContent={'center'} sx={{ paddingLeft: '20%', width: '80%' }}>
                    <Collapse in={!stopInterval}>
                        <LinearProgress />
                        <br />
                        <StyledBodyText>Request accepted. Report is loading.</StyledBodyText>
                    </Collapse>
                    <Collapse in={stopInterval}>
                        <CheckCircleOutlineIcon fontSize={'large'} />
                        <br />
                        <StyledBodyText>Report is ready to download!</StyledBodyText>
                        <StyledButton href={report?.downloadLink}>Download PDF report</StyledButton>
                    </Collapse>
                </Box>
            );
        }
    };

    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={6} textAlign={'center'}>
                <StyledPaper elevation={0}>
                    <StyledHeader>Stock Report Generator</StyledHeader>
                    <Collapse in={request === null}>
                        <StyledButton onClick={handleClick}>Generate stock report!</StyledButton>
                    </Collapse>
                    <br />
                    <Collapse in={request !== null}>{renderRequestStatus()}</Collapse>
                </StyledPaper>
            </Grid>
        </Grid>
    );
}
