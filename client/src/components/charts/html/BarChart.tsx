import React, { useState, useEffect } from 'react';
import { animateScroll } from "react-scroll";
import { useStyles } from '../../../styles/dataviz';
import {
    Box,
    Grid,
    // Collapse,
    // Fade 
} from '@material-ui/core';
import BarChartRowAbs from './BarChartRowAbs';
import BarChartRowAbsDelta from './BarChartRowAbsDelta';
import { BarChartData } from '../../../logic/datavizTypes';
import { aggregate } from '../d3/aggregate';

interface Props {
    id?: string;
    duration?: number;
    play: boolean;
    data: BarChartData;
    maxRows?: number;
    variant: "scroll" | "fade";
    type: "abs" | "abs-delta";
    rankColor?: "primary" | "secondary";
    categorySize?: "sm" | "md";
}


const BarChart = ({
    id,
    variant,
    type,
    duration = 20000,
    play,
    data,
    maxRows,
    rankColor,
    categorySize
}: Props) => {
    const classes = useStyles();

    // Aggregate value and targetValue, calculate delta and filter out unassigned category
    data = aggregate(data.map(row => ({
        category: row.category,
        value: row.value,
        targetValue: row.targetValue
    })))
        .map(row => ({
            ...row,
            delta: row.value && row.targetValue && row.value !== 0 && row.targetValue !== 0 ? (
                (row.value - row.targetValue) / row.targetValue * 100
            ) : undefined
        }))
        .filter(row => row.category && row.category !== "");

    const max = Math.max(...data.map(row => row.value))

    // Scroll ID needs to be provided for the automatic scroll to work
    const scrollID = `scroll-container-${id ? id : 'bottom'}`

    const scrollProps = {
        containerId: scrollID,
        duration: 2000,
    };

    const [top, setTop] = useState(true);
    const scrollToBottom = () => {
        animateScroll.scrollToBottom(scrollProps);
    }

    const scrollToTop = () => {
        animateScroll.scrollToTop(scrollProps);
    }

    // Automatically scroll the chart to bottom, then top. 
    // Duration determines how long the chart is not moving
    useEffect(() => {
        if (variant === "scroll") {
            const interval = setInterval(() => {
                if (play) {
                    top ? scrollToBottom() : scrollToTop()
                    setTop(prev => !prev)
                }
            }, duration / 2 - 1000);

            // Returning a function in useEffect is equivilent of componentWillUnmount in a React Class
            return () => clearTimeout(interval);
        }
    }, [data]);

    return (
        <Box
            id={scrollID}
            className={classes.chartContainer}
        >
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                {/* Hide unassigned values from the original array */}
                {data && data.sort((a, b) => b.value - a.value)
                    .map((row, i) => (
                        type === "abs" ? (
                            <BarChartRowAbs
                                key={`chart-bar-${i}-${row.value}`}
                                i={i}
                                category={row.category}
                                value={row.value}
                                delta={row.delta}
                                max={max}
                                rankColor={rankColor}
                                categorySize={categorySize}
                            />
                        ) : (
                                <BarChartRowAbsDelta
                                    key={`chart-bar-${i}-${row.value}`}
                                    i={i}
                                    category={row.category}
                                    value={row.value}
                                    delta={row.delta}
                                    max={max}
                                    absPosition="behind-bar"
                                    rankColor={rankColor}
                                    categorySize={categorySize}
                                />
                            )
                    ))}
            </Grid>
        </Box>
    )
};

export default BarChart;