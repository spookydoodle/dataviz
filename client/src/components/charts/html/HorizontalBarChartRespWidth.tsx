import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fontSizes } from '../../../styles/themes';
import { Box, Typography, List, ListItem } from '@material-ui/core';
import { BarChartData } from '../../../logic/datavizTypes';
import { aggregate } from '../d3/aggregate';

const useStyles = makeStyles(theme => ({
    barSet: {
        padding: '8px 0',
        width: '100%',
        maxWidth: "50em",
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: fontSizes.tertiary,
        boxSizing: 'border-box',
        display: 'inline-block',
        lineHeight: '10pt',
        [theme.breakpoints.down('sm')]: {
            maxWidth: theme.breakpoints.width('sm'),
        },
    },
    barRow: {
        boxSizing: 'border-box',
        display: 'block',
        padding: '3px 0',
        maxHeight: '.5em',
        clear: 'both',
    },
    barLabel: {
        fontSize: fontSizes.quaternary,
        boxSizing: 'border-box',
        paddingRight: '15px',
        // marginTop: '3px',
        width: '44%',
        display: 'inline-block',
        float: 'left',
        textAlign: 'right',
        verticalAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
            marginBottom: '2px',
            display: 'block',
            float: 'none',
            width: 'auto',
        },
    },
    barLabel2: {
        fontWeight: 'bolder',
        width: '6%',
        minWidth: '45px',
        paddingRight: '10px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
            marginBottom: '2px',
            display: 'block',
            float: 'none',
            width: 'auto',
        },
    },
    list: {
        listStyle: 'none',
        margin: '0',
        padding: '0',
        display: 'inline-block',
        position: 'relative',
        boxSizing: 'border-box',
        // paddingInlineStart: '10px',
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    bar: {
        border: '2px solid #000',
        marginTop: '.25em',
        height: '1.25em',
        borderRadius: "2px",
        content: '',
        lineHeight: '16px',
        textAlign: 'right',
        paddingTop: '1px',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
    }
}));

interface Props {
    data: BarChartData;
    color: string;
}

const HorizontalBarChartRespWidth = ({ data, color }: Props) => {
    const classes = useStyles();
    const theme = useTheme();

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

    return (
        <Box className={classes.barSet} style={{ color: color }}>
            {data.sort((a, b) => b.value - a.value)
                .map((row, i) =>
                    <Box key={`chart-bar-${i}`} className={classes.barRow}>
                        <Typography color="textPrimary" className={classes.barLabel}>
                            {row.category}
                        </Typography>
                        <Typography color="textPrimary" className={`${classes.barLabel} ${classes.barLabel2}`}>
                            {/* <Typography color="textPrimary"> */}
                            {row.value}
                            {/* </Typography> */}
                        </Typography>
                        <List className={classes.list}>
                            <ListItem
                                style={{ width: `${row.value / max * 100}%` }}
                                className={classes.bar}
                            />
                        </List>
                    </Box>

                )}
        </Box>
    )
};

export default HorizontalBarChartRespWidth;
