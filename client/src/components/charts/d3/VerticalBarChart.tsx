import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max, sum } from 'd3-array';
import ChartImpl from './ChartImpl';
import { BarChart } from '../../../logic/datavizTypes';
import { aggregate } from'./aggregate';

const VerticalBarChart = ({ data, size, labelsPos }: BarChart) => {
   const theme = useTheme();

   // Aggregate data
   const aggrData = aggregate(data);
   const values = aggrData.map(row => row.value)
   const categories = aggrData.map(row => row.category)
   const maxValue = max(values)
   // TODO: calculate based on longest category text length and font size
   const offset = { 
      top: 0, 
      left: maxValue ? maxValue.toString().length * 10 : 40, 
      bottom: categories.reduce((longestStr, str) => longestStr.length < str.length ? str : longestStr).length * 4, 
      right: 0, 
   }
   const margin = {top: 20, left: 20, bottom: 20, right: 20}
   const chartWidth = size.width - margin.left - margin.right - offset.left - offset.right;
   const chartHeight = size.height - margin.left - margin.right - offset.top - offset.bottom;

   // Horizontal axis
   const xScale = scaleBand()
      .range([0, chartWidth])
      .domain(categories)

   // Vertical axis
   const yScale = scaleLinear()
      .range([0, chartHeight])
      .domain([maxValue ? maxValue : 100, 0]) // TODO: solve this i na better way

   const xRect = (d: number, i: number) => offset.left + 0.05 * xScale.bandwidth() + (xScale(categories[i]) || 0)
   const yRect = (d: number, i: number) => yScale(d)
   const heightRect = (d: number) => chartHeight - yScale(d)
   const widthRect = (d: number) => 0.9 * xScale.bandwidth() 
   // const xLabel = (d: number) => 0.9 * xScale.bandwidth() - 100;

   
   return (
      <ChartImpl
         type="vertical"
         categories={categories}
         values={values}
         chartHeight={chartHeight}
         chartWidth={chartWidth}
         xScale={xScale}
         yScale={yScale}
         showXScale={true}
         showYScale={true}
         xRect={xRect}
         yRect={yRect}
         labelsPos={labelsPos}
         widthRect={widthRect}
         heightRect={heightRect}
         xCatAngle={-45}
         yCatAngle={0}
         size={size}
         margin={margin}
         offset={offset}
         barColor={theme.palette.primary.main}
         xFontColor={theme.palette.text.primary}
         yFontColor={theme.palette.text.primary}
         xFontSize={theme.typography.fontSize - 2}
         yFontSize={theme.typography.fontSize - 4}
      />
   )

}

export default VerticalBarChart;