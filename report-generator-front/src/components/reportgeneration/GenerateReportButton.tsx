import { Collapse } from '@mui/material';
import IRequestReport from '../../model/IRequest';
import { StyledButton } from './ReportGenerationStyledComponents';

interface IGenerateReportButtonProps {
    handleClick: () => void;
    isLoading: boolean;
    request: IRequestReport | null;
}

export default function GenerateReportButton(props: IGenerateReportButtonProps) {
    return (
        <Collapse in={props.request === null}>
            <StyledButton onClick={props.handleClick} disabled={props.isLoading}>
                {props.isLoading ? 'Generating Report...' : 'Generate stock report!'}
            </StyledButton>
        </Collapse>
    );
}
