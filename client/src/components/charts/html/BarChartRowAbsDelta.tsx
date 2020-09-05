import React from 'react';
import { useStyles } from '../../../styles/dataviz';
import {
    Box,
    Grid,
    Typography,
    // Collapse,
    // Fade 
} from '@material-ui/core';
import { formatNumber } from '../../../utils/numberFormat';

interface Props {
    i: number;
    category: string;
    filler: boolean;
    value: number;
    delta: number;
    max: number;
    scaling?: 1 | 1000 | 1000000;
    decimals?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    absPosition: "behind-bar" | "align-column";
    rankColor?: "primary" | "secondary";
    categorySize?: "sm" | "md";
}


const BarChartRowAbsDelta = ({
    i,
    category,
    filler,
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
            // md={10}
            direction="row"
            className={`${classes.row} ${filler && classes.hide}`}
        >
            <Grid
                container
                item xs={5}
                justify="space-between"
            >
                <Grid item>
                    <Typography
                        component="span"
                        color="primary"
                        noWrap
                        variant="body2"
                        className={`${classes.labels} ${classes.category} ${classes.padding}`}
                    >
                        <Typography
                            component="span"
                            color="textSecondary"
                            variant="body2"
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
                        color="primary"
                        component="span"
                        variant="body2"
                        // noWrap
                        className={`${classes.labels} ${classes.label}`}
                    >
                        {value ? `${formatNumber(value, 1000, 1)}` : "0.0"}
                    </Typography>}
                </Grid>

                {absPosition === "align-column" && <Grid
                    item
                    container
                    justify="flex-start"
                    xs={1}
                >
                    <Typography
                        color="primary"
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
                    xs={12} lg={7}
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