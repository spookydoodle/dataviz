import React from 'react';
import clsx from 'clsx';
import { useStyles } from '../../styles/main';
import { Link } from '../../utils/Link';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, Hidden } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DarkModeSwitch from '../DarkModeSwitch';
import { AuthButtonsVertical } from './AuthButtons';
import { PATHS } from '../../constants/data';
import { DrawerVariant, Mode, User } from '../../logic/types';

interface Props {
    user: User;
    mode: Mode;
    setMode: any;
    open: boolean;
    handleDrawerClose: any;
    handleDrawerOpen: any;
    variant?: DrawerVariant;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer = ({ user, variant = 'temporary', mode, setMode, open, handleDrawerClose, handleDrawerOpen }: Props) => {
    const classes = useStyles();
    const { home } = PATHS;

    const items = [
        {
            name: 'Home',
            path: home,
        },
    ];

    const style = { marginLeft: 'auto' };

    return (
        // <Drawer
        //     className={classes.drawer}
        //     variant={variant}
        //     anchor="left"
        //     open={open}
        //     onClose={toggleDrawer(false)}
        //     classes={{
        //         paper: classes.drawerPaper,
        //     }}
        // >
        //     <div className={classes.drawerHeader}>
        //         <IconButton onClick={toggleDrawer(false)}>
        //             <ChevronLeftIcon />
        //         </IconButton>
        //     </div>

        //     <Divider />

        //     <List>
        //         {items.map((item, i) => (
        //             <Link key={i} to={item.path}>
        //                 <ListItem button>
        //                     <ListItemText primary={item.name} />
        //                 </ListItem>
        //             </Link>
        //         ))}
        //     </List>
        //     <Hidden mdUp>
        //         <Divider />
        //         <AuthButtonsVertical user={user} />
        //     </Hidden>

        //     <Divider />
        //     <DarkModeSwitch style={style} mode={mode} setMode={setMode} />
        // </Drawer>
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default MenuDrawer;
