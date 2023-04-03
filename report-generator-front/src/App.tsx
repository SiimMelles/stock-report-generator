import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Home from './components/reportgeneration/Home';
import { StyledContainer } from './components/reportgeneration/ReportGenerationStyledComponents';

const theme = createTheme({
    typography: {
        fontFamily: `"Asap", sans-serif`,
        fontSize: 14,
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage:
                        'url("https://readyplayer.me/landing/images/home/bg-noise.png"),' +
                        'url("https://readyplayer.me/landing/images/home/bg-top-nav.svg")',
                    backgroundRepeat: 'repeat, no-repeat',
                    backgroundRepeatX: 'repeat no-repeat',
                    backgroundRepeatY: 'repeat no-repeat',
                    backgroundColor: '#32333e',
                    width: '100%'
                }
            }
        }
    },
    palette: {
        text: {
            primary: '#f6f6f6'
        },
        primary: {
            main: '#3ff2d7',
            contrastText: '#FFF'
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StyledContainer>
                <Home />
            </StyledContainer>
        </ThemeProvider>
    );
}

export default App;
