import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import ChartImpl from './ChartImpl';
import { BarChart } from '../../../logic/datavizTypes';
import { aggregate } from './aggregate';

const HorizontalBarChart = ({ data, size, resize, color }: BarChart) => {
   const theme = useTheme();

   // Aggregate data
   const aggrData = aggregate(data);
   const values = aggrData.map(row => row.value)
   const categories = aggrData.map(row => row.category)
   const maxValue = max(values)
   // TODO: handle optional props for axis offset from chart borders
   const offset = {
      top: 0,
      left: categories.reduce((longestStr, str) => longestStr.length < str.length ? str : longestStr).length * 7,
      // bottom: maxValue ? maxValue.toString().length * 4 : 40,
      bottom: 0,
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
   
   // For Labels by bars
   const yRectLabel = (d: number, i: number) => (yScale(categories[i]) || 0) + yScale.bandwidth() / 2
   const widthRect = (d: number) => xScale(d)
   const widthRectLabel = (d: number) => xScale(d) - xScale(0)


   return (
      <ChartImpl
         type="horizontal"
         categories={categories}
         values={values}
         chartHeight={chartHeight}
         chartWidth={chartWidth}
         xScale={xScale}
         yScale={yScale}
         showXScale={false}
         showYScale={true}
         xRect={xRect}
         yRect={yRect}
         widthRect={widthRect}
         widthRectLabel={widthRectLabel}
         yRectLabel={yRectLabel}
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
         xFontSize={theme.typography.fontSize - 4}
         yFontSize={theme.typography.fontSize - 2}
      />
   )

}

export default HorizontalBarChart;