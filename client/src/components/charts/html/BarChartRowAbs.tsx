import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Box,
    Grid,
    Typography,
    // Collapse,
    // Fade 
} from '@material-ui/core';
import { formatNumber } from '../../../utils/numberFormat';
import { fontSizes } from '../../../styles/themes';


interface Props {
    i: number;
    category: string;
    value: number;
    delta?: number;
    max: number;
    scaling?: 1 | 1000 | 1000000;
    decimals?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    rankColor?: "primary" | "secondary";
    categorySize?: "sm" | "md";
}

const rowFontSize = Number(fontSizes.tertiary.replace("vh", ""));
const rowMargin = .25;
const rowHeight = 3;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
        marginTop: `${rowMargin}vh`,
        marginBottom: `${rowMargin}vh`,
        height: `${rowHeight}vh`,
    },
    
    barContainer: {
        display: "flex",
    },
    bar: {
        height: `${rowHeight}vh`,
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
    labels: {
        // paddingTop: ".5vh",
        '&$category': {
            // textTransform: "uppercase",
            fontSize: fontSizes.quaternary,
            [theme.breakpoints.down('sm')]: {
                fontSize: fontSizes.quinary,
            },
            [theme.breakpoints.only('xs')]: {
                fontSize: fontSizes.senary,
            },
        },
        '&$label': {
            fontWeight: "bold",
            textAlign: "center",
            paddingLeft: ".5em",
            fontSize: fontSizes.quinary,
            [theme.breakpoints.down('sm')]: {
                fontSize: fontSizes.senary,
            },
            [theme.breakpoints.only('xs')]: {
                fontSize: fontSizes.septenary,
            },
        },
        '&$delta': {
            fontWeight: "bold",
            // opacity: .6,
            fontSize: fontSizes.quinary,
            [theme.breakpoints.down('sm')]: {
                fontSize: fontSizes.senary,
            },
            [theme.breakpoints.only('xs')]: {
                fontSize: fontSizes.septenary,
            },
        },
        '&$deltaMax': {
            paddingTop: "1vh",
            fontSize: `calc(${fontSizes.quinary} - .3vh)`,
            [theme.breakpoints.down('sm')]: {
                fontSize: fontSizes.senary,
            },
            [theme.breakpoints.only('xs')]: {
                fontSize: fontSizes.septenary,
            },
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
  })
);

const BarChartRowAbs = ({
    i,
    category,
    value,
    delta,
    max,
    scaling = 1,
    decimals = 0,
    rankColor = "primary",
    categorySize = "md",
}: Props) => {
    const classes = useStyles();

    // TODO: add styles for delta to adjust opacity based on the value
    const getStyle = (opacity: number) => ({
        opacity: `${opacity}`
    })

    return (
        <Grid
            id={`chart-row-${i}`}
            container
            item
            xs={12}
            direction="row"
            className={`${classes.row}`}
        >
            <Grid
                container
                item xs={6}
                justify="space-between"
            >
                <Grid item xs={8} container>
                    <Typography
                        component="span"
                        variant="body2"
                        noWrap
                        className={`${classes.labels} ${classes.category}`}
                    >
                        <Typography
                            component="span"
                            color="textSecondary"
                            variant="body2"
                            noWrap
                            className={`${classes.labels} ${classes.category} ${classes.rank}`}
                        >{`#${i + 1} `}</Typography>{category}
                    </Typography>
                </Grid>
                <Grid item xs={4} container justify="flex-end">
                    <Typography
                        component="span"
                        noWrap
                        variant="body2"
                        className={`${classes.labels} ${classes.delta} 
                        ${delta && delta > 0 ? classes.deltaPos : classes.deltaNeg} 
                        ${(delta && (delta <= -1000 || delta >= 1000)) ? classes.deltaMax : ''}`}
                    >
                        {delta ? (
                            `${delta >= 1000 ? ' > +999' : delta <= -999 ? '< -999' : `${delta > 0 ? "+" : ""}${formatNumber(delta, 1, 0)}`}%`
                        ) : "0%"}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={4} className={classes.barContainer}>
                <Box width={`${value / max * 100}%`} className={`${classes.bar} ${classes.neutral}`} />
            </Grid>

            <Grid
                item
                container
                justify="flex-start"
                xs={2}
            >
                <Typography
                    noWrap
                    variant="body2"
                    className={`${classes.labels} ${classes.label}`}
                >
                    {formatNumber(value ? value : 0, scaling, decimals)}
                </Typography>
            </Grid>
        </Grid>
    )
};

export default BarChartRowAbs;