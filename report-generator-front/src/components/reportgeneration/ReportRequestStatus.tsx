import { Box, Collapse, LinearProgress } from '@mui/material';
import { StyledBodyText, StyledButton } from './ReportGenerationStyledComponents';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IRequestReport from '../../model/IRequest';
import IGetReport from '../../model/IGetReport';

interface IRequestStatusProps {
    report: IGetReport | null;
    request: IRequestReport | null;
    stopInterval: boolean;
}

export default function RequestStatus(props: IRequestStatusProps) {
    const renderRequestStatus = () => {
        if (props.request?.status === 'Success') {
            return (
                <Box justifyContent={'center'} sx={{ paddingLeft: '20%', width: '80%' }}>
                    <Collapse in={!props.stopInterval}>
                        <LinearProgress />
                        <br />
                        <StyledBodyText>Request accepted. Report is loading.</StyledBodyText>
                    </Collapse>
                    <Collapse in={props.stopInterval}>
                        <CheckCircleOutlineIcon fontSize={'large'} />
                        <br />
                        <StyledBodyText>Report is ready to download!</StyledBodyText>
                        <StyledButton href={props.report?.downloadLink}>Download PDF report</StyledButton>
                    </Collapse>
                </Box>
            );
        }
    };

    return <Collapse in={props.request !== null}>{renderRequestStatus()}</Collapse>;
}
