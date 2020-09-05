/* 
    The purpose of this file is to integrate styles for charts 
    in one place and reuse classes in various components
*/
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fontSizes } from './themes';

const rowFontSize = Number(fontSizes.tertiary.replace("vh", ""));
const rowMargin = .25;
const rowHeight = 2.75;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: "bold",
        },
        center: {
            textAlign: "center",
        },
        chartContainer: {
            width: "100%",
            // maxHeight: `${(rowFontSize + 2 * rowMargin) * 10}vh`,
            maxHeight: `24em`,
            // maxHeight: `36vh`,
            overflow: "hidden",
            paddingLeft: "1em",
            paddingRight: "1em",
        },
        chartContainerSm: {
            width: "100%",
            maxHeight: `24.5em`,
            overflow: "hidden",
            paddingLeft: "1.5em",
            paddingRight: ".5em",
        },
        row: {
            marginTop: `${rowMargin}vh`,
            marginBottom: `${rowMargin}vh`,
            height: `${rowHeight}vh`,
        },
        padding: {
            paddingLeft: "1.2em",
        },
        labels: {
            paddingTop: ".5vh",
            '&$category': {
                // textTransform: "uppercase",
            },
            '&$label': {
                fontWeight: "bold",
                textAlign: "center",
                paddingLeft: ".5em",
                // fontSize: fontSizes.senary,
            },
            '&$delta': {
                fontWeight: "bold",
                // opacity: .6,
                // fontSize: fontSizes.senary,
            },
            '&$deltaMax': {
                paddingTop: "1vh",
                // fontSize: `calc(${fontSizes.senary} - .3vh)`,
            },
            '&$rank': {
                paddingRight: ".5em",
                fontWeight: "bold",
            },
        },
        category: {},
        label: {},
        delta: {},
        deltaMax: {},
        rank: {},
        barContainer: {
            display: "flex",
        },
        bar: {
            borderRadius: "1px",
            '&$neutral': {
                marginLeft: ".5em",
                marginRight: ".5em",
                backgroundColor: theme.palette.primary.main,
            },
            '&$pos': {
                marginRight: ".5em",
                backgroundColor: theme.palette.success.main,
            },
            '&$neg': {
                marginLeft: ".5em",
                backgroundColor: theme.palette.error.main,
            },
            '&$posExceed': {
                marginRight: ".5em",
                background: `linear-gradient(90deg, ${theme.palette.success.main} 80%, rgba(0,0,0,0) 100%)`,
            },
            '&$negExceed': {
                marginLeft: ".5em",
                background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${theme.palette.error.main} 20%);`,
            },
        },
        pos: {},
        neg: {},
        posExceed: {},
        negExceed: {},
        neutral: {},
        deltaPos: {
            fontWeight: "bold",
            color: theme.palette.success.main,
            textAlign: "right",
        },
        deltaNeg: {
            fontWeight: "bold",
            color: theme.palette.error.main,
            textAlign: "right",
        },
        md: {},
        sm: {},
        left: {
            textAlign: "left",
        },
        right: {
            textAlign: "right",
        }, 
        // Animations
        fadeOutIn: {
            animation: `$fade-out-in 2s ease-in-out`,
        },
        fadeOut: {
            animation: `$fade-out 1s ease-in-out`,
        },
        fadeIn: {
            animation: `$fade-in 1s ease-in-out`,
        },
        '@keyframes fade-out-in': {
            '0%': {
                opacity: 1,
            },
            '50%': {
                opacity: 0,
            },
            '100%': {
                opacity: 1,
            },
        },
        '@keyframes fade-out': {
            '0%': {
                opacity: 1,
            },
            '100%': {
                opacity: 0,
            },
        },
        '@keyframes fade-in': {
            '0%': {
                opacity: 0,
            },
            '100%': {
                opacity: 1,
            },
        },
        hide: {
            opacity: 0,
        },
        slideInOut: {
            animation: `$slide-in-out 2s ease-in-out`,
        },
        slideOut: {
            animation: `$slide-out 1s ease-in`,
        },
        slideIn: {
            animation: `$slide-in 1s ease-out`,
        },
        '@keyframes slide-in-out': {
            '0%': {
                maxHeight: `${(rowFontSize + 6 * rowMargin) * 10}vh`,
            },
            '50%': {
                maxHeight: 0,
            },
            '100%': {
                maxHeight: `${(rowFontSize + 6 * rowMargin) * 10}vh`,
            },
        },
        '@keyframes slide-out': {
            '0%': {
                maxHeight: 0,
            },
            '80%': {
                maxHeight: `${(rowFontSize + 6 * rowMargin) * 10}vh`,
            },
            '100%': {
                maxHeight: `${(rowFontSize + 6 * rowMargin) * 10}vh`,
            },
        },
        '@keyframes slide-in': {
            '0%': {
                maxHeight: `${(rowFontSize + 6 * rowMargin) * 10}vh`,
            },
            '20%': {
                maxHeight: `${(rowFontSize + 6 * rowMargin) * 10}vh`,
            },
            '100%': {
                maxHeight: 0,
            },
        },
    })
);


export { useStyles };