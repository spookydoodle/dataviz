
import React, { Component } from 'react';
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import { Size, Position } from '../../../logic/datavizTypes';

interface Props {
   categories: Array<string>;
   values: Array<number>;
   chartHeight: number;
   chartWidth: number;
   // xScale: AxisScale<AxisDomain> | ScaleBand<string> | ScaleLinear<number, number>;
   // yScale: AxisScale<AxisDomain> | ScaleBand<string> | ScaleLinear<number, number>;
   xScale?: any;
   yScale?: any;
   xRect: (d: number, i: number) => number;
   yRect: (d: number, i: number) => number;
   widthRect: (d: number) => number;
   heightRect: (d: number) => number;
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
}

class ChartImpl extends Component<Props, {}> {
   node: any

   constructor(props: Props) {
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
      this.createBarChart()
   }

   // componentDidUpdate() {
   //    this.createBarChart()
   // }

   createBarChart() {
      const node = this.node;
      const {
         categories,
         values,
         chartHeight,
         xScale,
         yScale,
         xRect,
         yRect,
         widthRect,
         heightRect,
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
      } = this.props;


      const chart = select(node);

      // // Add responsiveness to the chart based on the 'resize' parameter, by default fixed size
      // if (resize === "responsive") {
      //    chart.attr("viewBox", [0, -20, size.width, size.height])
      //       .attr("preserveAspectRatio", "xMidYMid meet");
      // }



      // Add margin to the whole chart
      chart.append('g')
         .attr('transform', `translate(${margin.top}, ${margin.left})`)

      // Add y axis
      if (yScale) chart.append('g')
         .call(axisLeft(yScale))
         .attr('transform', `translate(${offset.left}, 0)`)
         // TODO: move to a separate method
         .selectAll("text")
         .attr("transform", `translate(0, 0)rotate(${yCatAngle})`)
         .style("text-anchor", "end")
         .style("font-size", yFontSize)
         .style("fill", yFontColor)

      // Add x axis
      if (xScale) chart.append('g')
         .attr('transform', `translate(${offset.left}, ${chartHeight})`)
         .call(axisBottom(xScale))
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

   }

   render() {
      return (
         <svg
            ref={node => this.node = node}
            width={this.props.size.width}
            height={this.props.size.height}>
         </svg>
      )
   }
}


export default ChartImpl;