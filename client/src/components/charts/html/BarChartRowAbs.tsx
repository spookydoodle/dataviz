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
    rankColor?: "primary" | "secondary";
    categorySize?: "sm" | "md";
}


const BarChartRowAbs = ({ 
    i, 
    category, 
    filler, 
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
            className={`${classes.row} ${filler && classes.hide}`}
        >
            <Grid
                container
                item xs={6}
                justify="space-between"
            >
                <Grid item xs={12} lg={8}>
                    <Typography
                        component="span"
                        color="primary"
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
                <Grid
                    item xs={12} lg={4} container justify="flex-end">
                    <Typography
                        component="span"
                        noWrap
                        variant="body2"
                        // className={`${classes.labels} ${delta > 0 ? classes.deltaPos : classes.deltaNeg}`}
                        className={`${classes.labels} ${classes.delta} ${delta > 0 ? classes.deltaPos : classes.deltaNeg} ${(delta <= -1000 || delta >= 1000) ? classes.deltaMax : ''}`}
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
                    color="primary" 
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