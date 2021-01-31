import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import ThemeWrapper from '../components/navigation/ThemeWrapper';
import Jumbotron from '../components/navigation/Jumbotron';
import MenuDrawer from '../components/navigation/MenuDrawer';
import NavBar from '../components/navigation/NavBar';
import { Drawer, Mode, Jumbotron as JumbotronType, User } from '../logic/types';
import { APP_NAME } from '../constants/data';
import NotificationsRenderer from '../components/NotificationsRenderer';

/*
  This component should serve as a wrapper for all pages. 
  Jumbotron and appBar are optional so the component can be use for layout with both, 
  with only jumbotron or only appBar or none of them but making use of the ThemeWrapper.
  Drawer allows additional properties, like variant. Not specified (default) is temporary. Other option is: persistent.
*/
interface Props {
    user: User;
    children: React.ReactChild | React.ReactChildren | Array<React.ReactChild> | undefined;
    jumbotron?: JumbotronType;
    drawer?: Drawer;
    appBar?: boolean;
    mode: Mode;
    setMode: any;
    // notifications: any;
    // onNotificationShown: any;
}

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      minHeight: "64px",
      // necessary for content to be below app bar
    //   ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const AppLayout = ({
    user,
    children,
    jumbotron,
    drawer,
    appBar,
    mode,
    setMode,
    // notifications,
    // onNotificationShown,
}: Props) => {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeWrapper mode={mode}>
            {appBar && (
                <NavBar
                    user={user}
                    name={APP_NAME}
                    mode={mode}
                    setMode={setMode}
                    drawerVariant="persistent"
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
            )}

            <MenuDrawer
                user={user}
                {...drawer}
                mode={mode}
                setMode={setMode}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
            />

            {/* {jumbotron && <Jumbotron {...jumbotron} />} */}

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
            {/* <NotificationsRenderer notifications={notifications} onShown={onNotificationShown} />  */}
        </ThemeWrapper >
    );
};

export default AppLayout;
