import { sum } from 'd3-array';
import { nest } from 'd3-collection';

// Type of obj is Array<{ category: string, value: number, targetValue: number }>
// TypeScript throws annoying errors, therefore moved this function to a .js file
export const aggregate = data =>
    nest()
    .key(d => d.category)
    .rollup(d => ({
            value: sum(d, e => e.value),
            targetValue: sum(d, e => e.targetValue)
        }))
    .entries(data)
    .map(row => ({ category: row.key, value: Number(row.value.value), targetValue: Number(row.value.targetValue) }))