import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { createTheme } from '../../styles/themes';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Mode } from '../../logic/types';

/*
  This component should serve as a wrapper for all pages. 
  Jumbotron and appBar are optional so the component can be use for either an option with both, with only jumbotron or only appBar.
  Drawer allows additional properties, like variant. Not specified (default) is temporary. Other option is: persistent.
*/
interface Props {
    mode: Mode;
    children: any;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
    },
  })
);

const ThemeWrapper = ({ mode, children }: Props) => {
    const classes = useStyles();
    const theme = createTheme(mode);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />

                {children}
            </div>
        </ThemeProvider>
    );
};

export default ThemeWrapper;
