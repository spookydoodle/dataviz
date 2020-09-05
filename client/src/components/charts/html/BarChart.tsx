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
    const max = Math.max(...data.map(row => row.value))
    const scrollID = `scroll-container-${id ? id : 'bottom'}`

    // Do not show rows, where category is unassigned
    data = data.filter(row => row.category && row.category !== "");

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: scrollID,
            duration: 1000,
        });
    }

    const scrollToTop = () => {
        animateScroll.scrollToTop({
            containerId: scrollID,
            duration: 100,
        });
    }


    const runScroll = () => {

        if (variant === "scroll") {
            scrollToTop();

            // Scroll only if total number of rows is > 10
            const timeout = setTimeout(() => {
                if (play && (maxRows || data.length > 10)) {
                    scrollToBottom()
                }
            }, duration / 2 - 1000);

            // Returning a function in useEffect is equivilent of componentWillUnmount in a React Class
            return () => {
                clearTimeout(timeout);
            };
        }

    }


    // This chart is intended to show 10 bars at once and then scroll to the next 10
    // class 'chartContainer' uses property 'maxHeight' = 10 * row fontSize and 'overflow' = hidden (or auto) 
    // to create a scroll panel
    // TODO: change fade classes to react-spring
    useEffect(() => {
        runScroll()
    }, [data]);

    // This filler is added to the rendered array in order to always have 10 elements in the scrollable container
    // This way the charts will be aligned as both brands can have different number of divisions or countries
    // If filler rows are not provided, fill to the closest 10*N
    const fillerArr = (maxRows || data.length % 10 !== 0) ? new Array(maxRows ? (maxRows - data.length) : 10 - data.length % 10)
        .fill({
            category: "",
            value: 0,
            delta: 0,
            filler: true,
        }) : [];
    // TODO: rewrite this filtering nicer, its also done in the return value

    // TODO: Easing function is different on the Fade component, try to use the CSS animation to also use ease-in-out
    return (
        // <Collapse timeout={500} in={variant === "scroll" ? show : true}>
        /* <Fade timeout={500} in={variant === "fade" ? show : true}> */
        // <Box className={(variant === "fade" && show) ? classes.fadeIn : classes.fadeOut}>
        <Box
            id={scrollID}
            className={`${type === "abs-delta" ? classes.chartContainer : classes.chartContainerSm}`}
        >
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                {/* Hide unassigned values from the original array */}
                {data && [
                    ...data.sort((a, b) => b.value - a.value),
                    ...fillerArr
                ].map((row, i) => (
                    type === "abs" ? (
                        <BarChartRowAbs
                            key={`chart-bar-${i}-${row.value}`}
                            i={i + 1}
                            category={row.category}
                            filler={row.filler}
                            value={row.value}
                            delta={row.delta}
                            max={max}
                            rankColor={rankColor}
                            categorySize={categorySize}
                        />
                    ) : (
                            <BarChartRowAbsDelta
                                key={`chart-bar-${i}-${row.value}`}
                                i={i + 1}
                                category={row.category}
                                filler={row.filler}
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
        // </Box>
        /* </Fade> */
        // </Collapse>
    )
};

export default BarChart;