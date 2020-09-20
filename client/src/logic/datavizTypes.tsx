interface Size {
    width: number;
    height: number;
}

interface Position {
    top: number;
    bottom: number;
    right: number;
    left: number;
}

interface BarChart {
    data: Array<{ category: string, value: number, }>;
    size: Size;
    resize?: "fixed" | "responsive";
    color?: string;
    labelsPos?: "outside" | "inside";
}

interface BarChartDataItem {
    category: string;
    value: number;
    delta?: number;
    targetValue?: number;
    filler?: boolean;
}

type BarChartData = Array<BarChartDataItem>;



export type {
    Size,
    Position,
    BarChart,
    BarChartDataItem,
    BarChartData,
}