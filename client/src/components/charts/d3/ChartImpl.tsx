
import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { axisLeft, axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import { Size, Position } from '../../../logic/datavizTypes';

interface Props {
   type: "horizontal" | "vertical";
   categories: Array<string>;
   values: Array<number>;
   valuesSecondary?: Array<number>;
   chartHeight: number;
   chartWidth: number;
   // xScale: AxisScale<AxisDomain> | ScaleBand<string> | ScaleLinear<number, number>;
   // yScale: AxisScale<AxisDomain> | ScaleBand<string> | ScaleLinear<number, number>;
   xScale: any;
   yScale: any;
   showXScale?: boolean;
   showYScale?: boolean;
   xRect: (d: number, i: number) => number;
   yRect: (d: number, i: number) => number;
   widthRect: (d: number) => number;
   heightRect: (d: number) => number;
   widthRectLabel?: (d: number) => number;
   heightRectLabel?: (d: number) => number;
   yRectLabel?: (d: number, i: number) => number;
   xCatAngle: number;
   yCatAngle: number;
   size: Size;
   resize?: "fixed" | "responsive";
   margin: Position;
   offset: Position;
   barColor: string;
   xFontColor: string;
   yFontColor: string;
   xFontSize: number;
   yFontSize: number;
   xTickSize?: number;
   yTickSize?: number;
}
type d3Node = {
   filter: any;
 };
// TODO: implement text wrapping on x and y axis, example: https://gist.github.com/jimkang/7864867
class ChartImpl extends Component<Props, {}> {
   node: any

   constructor(props: Props) {
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
      this.createBarChart();
      console.log("Rendered, josh is right")
   }


   createBarChart() {
      const node = this.node;
      const {
         type,
         categories,
         values,
         chartHeight,
         xScale,
         yScale,
         showXScale = true,
         showYScale = true,
         xRect,
         yRect,
         widthRect,
         heightRect,
         widthRectLabel,
         heightRectLabel,
         yRectLabel,
         xCatAngle,
         yCatAngle,
         size,
         resize = "fixed",
         margin,
         offset,
         barColor,
         xFontColor,
         yFontColor,
         xFontSize,
         yFontSize,
         xTickSize = 0,
         yTickSize = 0,
      } = this.props;

      const a = size;
      const chart = select(node);

      // // Add responsiveness to the chart based on the 'resize' parameter, by default fixed size
      // if (resize === "responsive") {
      //    chart.attr("viewBox", [0, 0, size.width, size.height])
      //       .attr("preserveAspectRatio", "xMidYMid meet");
      // }



      // Add margin to the whole chart
      chart.append('g')
         .attr('transform', `translate(${margin.top}, ${margin.left})`)

      // Add y axis
      if (showYScale) 
      chart.append('g')
         .call(axisLeft(yScale).tickSize(yTickSize))
         .attr('transform', `translate(${offset.left}, 0)`)
         // TODO: move to a separate method
         .selectAll("text")
         .attr("transform", `translate(0, 0)rotate(${yCatAngle})`)
         .style("text-anchor", "end")
         .style("text-overflow", "ellipsis")
         .style("white-space", "noWrap")
         .style("overflow", "hidden")
         .style("font-size", yFontSize)
         .style("fill", yFontColor)

      // Add x axis
      if (showXScale) 
      chart.append('g')
         .attr('transform', `translate(${offset.left}, ${chartHeight})`)
         .call(axisBottom(xScale).tickSize(xTickSize))
         // TODO: move to a separate method
         .selectAll("text")
         .attr("transform", `translate(0, 0)rotate(${xCatAngle})`)
         .style("text-anchor", "end")
         .style("font-size", xFontSize)
         .style("fill", xFontColor)

      // Add data bars
      chart.selectAll()
         .data(values)
         .enter()
         .append('rect')
         .attr('x', xRect)
         .attr('y', yRect)
         .attr('height', heightRect)
         .attr('width', widthRect)
         .style('fill', barColor)
         // .exit()
         // Add labels behind horizontal bars
      
      // TODO: Repair - this displays labels for each single stacked bar
      if (type === "horizontal" && yRectLabel) chart.append("g")
      .attr('transform', `translate(${offset.left}, 0)`)
         .attr("fill", "white")
         .attr("text-anchor", "end")
         .attr("font-size", yFontSize)
         .selectAll("text")
         .data(values)
         .join("text")
         .attr("x", widthRect)
         .attr("y", yRectLabel)
         .attr("dy", "0.35em")
         .attr("dx", -4)
         .text((d: number) => d)
         .call((text: { filter: any }) => text.filter(widthRectLabel ? widthRectLabel : 1 < 20)) // short bars
            .attr("dx", +4)
            .attr("fill", barColor)
            .attr("text-anchor", "start")

   }

   render() {
      return (
         <svg
            ref={node => this.node = node}
            width={this.props.size.width}
            height={this.props.size.height}
         />
      )
   }
}


export default ChartImpl;