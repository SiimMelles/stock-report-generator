import { Button, Container, Paper, styled, Typography } from '@mui/material';

export const StyledHeader = styled(Typography)(() => ({
    fontWeight: 'normal',
    fontSize: '2rem',
    padding: '2rem',
    color: '#f6f6f6'
}));

export const StyledBodyText = styled(Typography)(() => ({
    fontWeight: 'bold',
    padding: '1rem',
    color: '#f6f6f6'
}));

export const StyledButton = styled(Button)(() => ({
    margin: '1rem',
    padding: '0.75rem',
    width: '80%',
    background: '#00ffff',
    color: '#1d221c',
    fontWeight: '500',
    border: '1px solid #000',
    borderRadius: '9px',
    '&:hover': {
        background: '#0bcdc2'
    }
}));

export const StyledPaper = styled(Paper)(() => ({
    padding: '1rem',
    backgroundColor: '#101e26',
    borderRadius: '30px'
}));

export const StyledContainer = styled(Container)(() => ({
    paddingTop: '10vh',
    position: 'relative',
    minHeight: '100vh',
    backgroundSize: 'cover'
}));
