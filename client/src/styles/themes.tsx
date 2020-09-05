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
                light: '#02A9EA',
                main: '#3A0CA3',
                dark: '#1B065E',
                contrastText: "#F7EDF0",
            },
            secondary: {
                light: '#DF7373',
                main: '#CC444B',
                dark: '#89023E',
                contrastText: "#F7EDF0",
            },
            common: {
                black: '#000',
                white: '#fff',
            },
            background: {
                paper: type === 'dark' ? '#372549' : '#F8EDEB',
                default: type === 'dark' ? '#1A1423' : '#FCD5CE',
            },
            error: {
                light: '#BF0603',
                main: '#8D0801',
                dark: '#8D0801',
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
                primary: type === 'dark' ? 'rgba(255, 255, 255, .87)' : '#CC444B',
                secondary: type === 'dark' ? 'rgba(255, 255, 255, .6)' : '#E39695',
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

export { createTheme };
