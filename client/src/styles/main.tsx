/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// Below components need to be imported to correctly overwrite styles with classes in useStyle
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

// // Custom palette - colors should be defined here and referenced in classes
// const theme.palette.primary.main = '#1A1A1D'; // black
// const theme.palette.secondary.main = '#950740'; // dark purple
// const theme.palette.primary.light = '#F0F0F0'; // light grey
// const color4 = '#6e6e6e'; // lighter black
// const "rgba(255, 255, 255, .075)" = 'rgba(255, 255, 255, 0.075)';
// const "rgba(0, 0, 0, .075)" = 'rgba(0, 0, 0, 0.075)';

// Misc const used in styles
const drawerWidth = 300;
const toolbarHeight = 50;
const jumbotronHeight = "100vh";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // Display and size
        main: {
            backgroundColor: theme.palette.primary.main,
            minWidth: '100%',
            minHeight: '100%',
        },
        flexSpaceBetween: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        },
        flexCenter: {
            display: 'flex',
            justifyContent: 'center',
        },
        width100: {
            width: '100px',
        },
        spacingRight: {
            paddingRight: theme.spacing(1),
        },
        spacingLeft: {
            paddingLeft: theme.spacing(1),
        },
        spacingTop: {
            paddingTop: theme.spacing(1),
        },
        spacingBottom: {
            paddingBottom: theme.spacing(1),
        },
        height200: {
            height: '200px',
        },
        square200: {
            height: '200px',
            width: '200px',
            margin: '10px auto',
        },
        bottom20: {
            marginBottom: '20px',
        },

        // Containers
        bgDark: {
            backgroundColor: theme.palette.primary.main,
        },
        bgColor: {
            backgroundColor: theme.palette.secondary.main,
        },
        bgLight: {
            backgroundColor: theme.palette.primary.light,
        },
        bgHoverDarker: {
            backgroundColor: "rgba(0, 0, 0, .075)",
        },
        bgHoverLighter: {
            backgroundColor: "rgba(255, 255, 255, .075)",
        },
        jumbotron: {
            minHeight: jumbotronHeight,
        },
        jumbotronContent: {
            marginTop: `${toolbarHeight}px`,
            position: 'absolute',
            color: '#fff',
            height: `calc(${jumbotronHeight} - ${toolbarHeight}px)`,
        },
        jumbotronImg: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: jumbotronHeight,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            backgroundColor: '#000', // backgroundImage imported as a component in Layout.tsx
            boxShadow: '0px 2px 4px -1px rgba(0,0, 0.2)',
        },
        image: {
            display: 'block',
            // height: "auto",
            width: '90%',
            borderRadius: '3px',
            margin: '0 auto',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        toolbar: theme.mixins.toolbar,
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: `${drawerWidth}px`,
        },
        formPaper: {
            padding: theme.spacing(2),
            color: theme.palette.primary.main,
            width: '33%',
            minWidth: '400px',
            marginTop: '3%',
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // // necessary for content to be below app bar
            // ...theme.mixins.toolbar,
            minHeight: `${toolbarHeight}px !important`,
            justifyContent: 'flex-end',
        },
        contentPadding: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        vertMargin: {
            marginBottom: '10px',
        },

        // Texts
        textColorLight: {
            color: theme.palette.primary.light,
        },
        textColorDark: {
            color: theme.palette.primary.main,
        },
        textColor: {
            color: theme.palette.secondary.main,
        },
        noDecoration: {
            textDecoration: 'none',
        },
        center: {
            textAlign: 'center',
        },
        bold: {
            fontWeight: 'bold',
        },
        halfTransp: {
            opacity: '0.5',
        },

        // Hidden
        hideMdUp: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        hideSmDown: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },

        // Misc
        loading: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5%',
            fontSize: '10em',
            color: theme.palette.primary.main,
        },
    })
);

export { useStyles };