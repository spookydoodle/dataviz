/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { Mode } from '../logic/types';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Wrapper for the function in order to pass type parameter.
// Requires defining 'const theme' in components which make use of it. See Layout.tsx
const createTheme = (type: Mode) => {
    let theme = createMuiTheme({
        palette: {
            type: type,
            primary: {
                light: '#7049c9',
                main: type === 'dark' ? '#001845' : '#3A0CA3',
                dark: '#1B065E',
                contrastText: "#FCD5CE",
            },
            secondary: {
                light: '#DF7373',
                main: '#CC444B',
                dark: '#89023E',
                contrastText: "#F7EDF0",
            },
            background: {
                paper: type === 'dark' ? '#001845' : '#F8EDEB',
                default: type === 'dark' ? '#001233' : '#FCD5CE',
            },
            error: {
                light: '#EF576A',
                main: '#EF233C',
                dark: '#B3001B',
                contrastText: '#EDF2F4',
            },
            warning: {
                light: '#F9DCC4',
                main: '#FEC89A',
                dark: '#AD735F',
                contrastText: '#F8EDEB',
            },
            info: {
                light: '#90B5E0',
                main: '#90B5E0',
                dark: '#90B5E0',
                contrastText: 'rgba(255, 255, 255, .87)',
            },
            success: {
                light: '#95D5B2',
                main: '#74C69D',
                dark: '#40916C',
                contrastText: '#D8F3DC',
            },
            text: {
                primary: type === 'dark' ? '#FCD5CE' : '#3A0CA3',
                secondary: type === 'dark' ? '#F7EDF0' : '#E39695',
                disabled: 'rgba(133, 30, 30, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
            },
        },
        typography: {
            fontFamily: 'Lato',
            fontSize: 14,
        },
    });

    return responsiveFontSizes(theme);
};


const fontSizes = {
    primary: "3.5vh",
    secondary: "3vh",
    tertiary: "2.5vh",
    quaternary: "2.25vh",
    quinary: "2vh",
    senary: "1.75vh",
    septenary: "1.5vh",
    octonary: "1.25vh",
}

export { createTheme, fontSizes };
