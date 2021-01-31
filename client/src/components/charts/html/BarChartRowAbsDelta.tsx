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
    absPosition: "behind-bar" | "align-column";
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
    padding: {
        paddingLeft: "1.2em",
    },
  })
);

const BarChartRowAbsDelta = ({
    i,
    category,
    value,
    delta,
    max,
    scaling = 1,
    decimals = 0,
    absPosition,
    rankColor = "primary",
    categorySize = "md",
}: Props) => {
    const classes = useStyles();

    return (
        <Grid
            id={`chart-row-${i}`}
            container
            item
            xs={12}
            direction="row"
            className={classes.row}
        >
            <Grid
                container
                item xs={5}
                justify="space-between"
            >
                <Grid item container>
                    <Typography
                        component="span"
                        noWrap
                        variant="body2"
                        className={`${classes.labels} ${classes.category} ${classes.padding}`}
                    >
                        <Typography
                            component="span"
                            color="textSecondary"
                            variant="body2"
                            noWrap
                            className={`${classes.labels} ${classes.category} ${classes.rank} ${classes.padding}`}
                        >{`#${i + 1} `}</Typography>{category}
                    </Typography>
                </Grid>
            </Grid>

            {/* Prop 'absPosition' determines where labels behind the bars representing absolute values are positioned 
                They can either  be displayed directly after the right side of the bar, or be vertically aligned as a column
            */}
            <Grid item container xs={7}>
                <Grid
                    item
                    xs={absPosition === "behind-bar" ? 5 : 4}
                    className={classes.barContainer}
                >
                    <Box width={`${value / max * (absPosition === "behind-bar" ? 50 : 100)}%`} className={`${classes.bar} ${classes.neutral}`} />

                    {absPosition === "behind-bar" && <Typography
                        component="span"
                        variant="body2"
                        // noWrap
                        className={`${classes.labels} ${classes.label}`}
                    >
                        {value ? `${formatNumber(value, scaling, decimals)}` : "0.0"}
                    </Typography>}
                </Grid>

                {absPosition === "align-column" && <Grid
                    item
                    container
                    justify="flex-start"
                    xs={1}
                >
                    <Typography
                        variant="body2"
                        noWrap
                        className={`${classes.labels} ${classes.label}`}
                    >
                        {value ? `${formatNumber(value, scaling, decimals)}` : "0.0"}
                    </Typography>
                </Grid>}

                <Grid
                    container
                    item
                    xs={7}
                    className={classes.barContainer}
                >
                    {/* TODO: Add check for abs(delta) > 100 and add gradient css  */}
                    {/* Negative delta */}
                    <Grid item container justify="flex-end" xs={6}>

                        {delta && delta < 0 ? <>
                            <Typography
                                component="span"
                                variant="body2"
                                noWrap
                                className={`${classes.labels} ${classes.delta} ${classes.deltaNeg} ${delta <= -1000 ? classes.deltaMax : ''}`}
                            >
                                {delta > -1000 ? formatNumber(delta, 1, 0) : '< -999'}%
                        </Typography>

                            <Box
                                width={`${Math.abs(delta < -100 ? -100 : delta) / 100 * 50}%`}
                                className={`${classes.bar} ${delta < -100 ? classes.negExceed : classes.neg}`}
                            />
                        </> : <></>}

                    </Grid>

                    {/* Positive delta */}
                    <Grid item container justify="flex-start" xs={6}>
                        {delta && delta > 0 ? <>
                            <Box
                                width={`${Math.abs(delta > 100 ? 100 : delta) / 100 * 50}%`}
                                className={`${classes.bar} ${delta > 100 ? classes.posExceed : classes.pos}`}
                            />

                            <Typography
                                component="span"
                                noWrap
                                variant="body2"
                                className={`${classes.labels} ${classes.delta} ${classes.deltaPos} ${delta >= 1000 ? classes.deltaMax : ''}`}
                            >
                                {delta < 1000 ? `+${formatNumber(delta, 1, 0)}` : '> +999'}%
                        </Typography>
                        </> : <></>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default BarChartRowAbsDelta;