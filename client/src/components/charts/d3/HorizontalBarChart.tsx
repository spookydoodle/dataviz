import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useStyles } from '../../../styles/main';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import ChartImpl from './ChartImpl';
import { BarChart } from '../../../logic/datavizTypes';

const HorizontalBarChart = ({ data, size, resize, color }: BarChart) => {
   const theme = useTheme();
   const values = data.map(row => row.value)
   const categories = data.map(row => row.category)
   const maxValue = max(values)
   // TODO: handle optional props for axis offset from chart borders
   const offset = {
      top: 0,
      left: categories.reduce((longestStr, str) => longestStr.length < str.length ? str : longestStr).length * 6,
      bottom: maxValue ? maxValue.toString().length * 4 : 40,
      right: 0,
   }
   const margin = { top: 20, left: 20, bottom: 20, right: 20 }
   const chartWidth = size.width - margin.left - margin.right - offset.left - offset.right;
   const chartHeight = size.height - margin.left - margin.right - offset.top - offset.bottom;

   // Horizontal axis
   const xScale = scaleLinear()
      .range([0, chartWidth])
      .domain([0, maxValue ? maxValue : 100])

   // Vertical axis
   const yScale = scaleBand()
      .range([0, chartHeight])
      .domain(categories)

   const xRect = (d: number, i: number) => offset.left + xScale(0)
   const yRect = (d: number, i: number) => 0.05 * yScale.bandwidth() + (yScale(categories[i]) || 0);
   const heightRect = (d: number) => 0.9 * yScale.bandwidth()
   const widthRect = (d: number) => xScale(d)


   return (
      <ChartImpl
         categories={categories}
         values={values}
         chartHeight={chartHeight}
         chartWidth={chartWidth}
         // xScale={xScale}
         yScale={yScale}
         xRect={xRect}
         yRect={yRect}
         widthRect={widthRect}
         heightRect={heightRect}
         xCatAngle={-45}
         yCatAngle={0}
         size={size}
         resize={resize}
         margin={margin}
         offset={offset}
         barColor={theme.palette.primary.main}
         xFontColor={theme.palette.text.primary}
         yFontColor={theme.palette.text.primary}
         xFontSize={theme.typography.fontSize - 2}
         yFontSize={theme.typography.fontSize}
      />
   )

}

export default HorizontalBarChart;