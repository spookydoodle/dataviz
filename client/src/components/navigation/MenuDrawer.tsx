import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { Link } from '../../utils/Link';
import Fade from '@material-ui/core/Fade';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, } from '@material-ui/core';
import PieChartIcon from '@material-ui/icons/PieChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DarkModeSwitch from '../DarkModeSwitch';
// import { AuthButtonsVertical } from './AuthButtons';
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

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        minHeight: "64px",
        // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
      },
      colorTextPrimary: {
          color: theme.palette.text.primary,
      },
      rotate: {
          transform: "rotate(90deg)"
      },
      hide: {
          display: "none",
      },
      toRight: {
          marginLeft: "auto",
      }
  })
);
// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer = ({ user, variant = 'temporary', mode, setMode, open, handleDrawerClose, handleDrawerOpen }: Props) => {
    const classes = useStyles();
    const { home } = PATHS;

    const items = [
        {
            name: 'Vertical bar',
            icon: <BarChartIcon />,
            path: home,
        },
        {
            name: 'Horizontal bar',
            icon: <BarChartIcon className={classes.rotate} />,
            path: home,
        },
        {
            name: 'Pie',
            icon: <PieChartIcon />,
            path: home,
        },
        {
            name: 'Doughnut',
            icon: <DonutLargeIcon />,
            path: home,
        },
        {
            name: 'Bubble',
            icon: <BubbleChartIcon />,
            path: home,
        },
        {
            name: 'Timeline',
            icon: <TimelineIcon />,
            path: home,
        },
    ];

const style = { marginLeft: "auto" }
    return (
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
            <List >
                {items.map((item, i) => (
                    <ListItem button key={`${item.name}-${i}`}>
                        <ListItemIcon className={classes.colorTextPrimary}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Fade in={open}>
                <DarkModeSwitch className={classes.toRight} mode={mode} setMode={setMode} />
            </Fade>
        </Drawer>
    );
};

export default MenuDrawer;
