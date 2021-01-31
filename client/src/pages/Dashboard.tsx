import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { useStyles } from '../styles/main';
import { LinearBuffer } from '../components/Loading';
import { Grid, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';
import AppLayout from '../layouts/AppLayout';
import HorizontalBarChart from '../components/charts/d3/HorizontalBarChart';
import VerticalBarChart from '../components/charts/d3/VerticalBarChart';
import BarChartRace from '../components/charts/d3/BarChartRace';
import HorizontalBarChartRespWidth from '../components/charts/html/HorizontalBarChartRespWidth';
import BarChart from '../components/charts/html/BarChart';
// import moment from 'moment';
import PALETTES from '../constants/colors';
import ChartCard from '../components/ChartCard';
import { StateData, Mode, User, NotificationProps } from '../logic/types';

interface Props {
    user: User;
    data?: StateData;
    mode: Mode;
    setMode: any;
    next?: any;
    notificationsProps?: NotificationProps;
    showError?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacingTop: {
        paddingTop: theme.spacing(1),
    },
    spacingBottom: {
        paddingBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "150px",
        width: "150px",
        marginLeft: "auto !important",
    },
  })
);

const Dashboard = ({ user, data, mode, setMode, notificationsProps }: Props) => {
    const classes = useStyles();
    const colPal = Object.values(PALETTES.GREEN_ORANGE);
    const [labelsPos, setLabelsPos] = React.useState('10');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLabelsPos(event.target.value as string);
    };

    return (
        <AppLayout
            user={user}
            mode={mode}
            setMode={setMode}
            drawer={{ variant: "persistent" }}
            appBar={true}
        // {...notificationsProps}
        >
            {!data || data.length === 0 ?
                <LinearBuffer /> : (
                    <Grid
                        container
                        spacing={2}
                    // direction="row"
                    // justify="space-evenly"
                    // alignItems="stretch"
                    >

                        {/* <Grid item xs={12}>
                                <Typography variant="h5" style={{ color: "#FFF" }}>
                                    Ultracool dashboard with some data
                            </Typography>
                                <Typography variant="subtitle2" style={{ color: "#FFF" }}>
                                    ...well, at least the beginning of an ultracool dashboard :3
                            </Typography>
                            </Grid> */}

                        <Grid container item xs={12} md={6}>
                            <Grid item xs={12} className={classes.spacingBottom}>
                                <ChartCard
                                    title="Racing divisions"
                                    subtitle="Values are in EUR"
                                    color={colPal[0]}
                                >
                                    <BarChartRace
                                        data={data.map(row => ({
                                            date: new Date(`${row.year.key}-${row.month.key}-01`),
                                            name: row.division.text,
                                            category: row.division.text,
                                            value: Number(row?.sales?.value) / 1000,
                                        }))}
                                        size={{ width: 500, height: 250 }}
                                    />
                                </ChartCard>
                            </Grid>
                            <Grid item xs={12} className={classes.spacingTop}>
                                <ChartCard
                                    title="Sales by calendar month"
                                    subtitle="Values are in EUR"
                                    color={colPal[0]}
                                >
                                    <VerticalBarChart
                                        data={data.sort((a, b) => a.month.key < b.month.key ? -1 : (
                                            a.month.key > b.month.key ? 1 : 0
                                        ))
                                            .map(row => ({
                                                category: row.month.text,
                                                value: Number(row.sales.value)
                                            }))}
                                        size={{ width: 500, height: 250 }}
                                        resize="responsive"
                                    />
                                </ChartCard>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <ChartCard
                                title="Ordered quantity by country"
                                subtitle="Values are in pieces"
                                color={colPal[0]}
                                actionItems={[<FormControl className={classes.formControl}>
                                    <InputLabel id="labels-position">Labels position</InputLabel>
                                    <Select
                                        labelId="select-labels-position"
                                        id="select-labels-position"
                                        value={labelsPos}
                                        onChange={handleChange}
                                        label="Labels position"
                                    >
                                        <MenuItem value={10}>Inside</MenuItem>
                                        <MenuItem value={20}>Outside</MenuItem>
                                    </Select>
                                </FormControl>]}
                            >
                                <HorizontalBarChart
                                    data={data.sort((a, b) =>
                                        a.country.text < b.country.text ? -1
                                            : (a.country.text > b.country.text ? 1 : 0))
                                        .map(row => ({
                                            category: row.country.text,
                                            value: Number(row.qty.value)
                                        }))}
                                    size={{ width: 400, height: 600 }}
                                    resize="responsive"
                                    labelsPos={Number(labelsPos) === 20 ? "outside" : "inside"}
                                />
                            </ChartCard>
                        </Grid>

                        <Grid item xs={12}>
                            <ChartCard
                                title="Quantity by division"
                                subtitle="Values are in pieces"
                                description={<span>
                                    This one adjusts bar width responsively to container width. Stolen from the Stack Overflow survey result webpage.
                                        <i className="user secret icon" />
                                </span>}
                                color={colPal[0]}
                            >
                                <HorizontalBarChartRespWidth
                                    data={data.map(row => ({
                                        category: `${row.division.text}`,
                                        value: Number(row.qty.value)
                                    }))}
                                    color={colPal[0]}
                                />
                            </ChartCard>
                        </Grid>

                        {/* TODO: Add counter to when the scroll happens */}
                        {/* TODO: Repair responsiveness */}
                        {/* TODO: Add a selector fo changing - constant slow scrolling or fast and stay */}
                        <Grid item xs={12} lg={6}>
                            <ChartCard
                                title="Index of awesomeness by country"
                                subtitle="No unit"
                                description={<span>
                                    This one scrolls up and down and up and down and up and down.
                                </span>}
                                color={colPal[0]}
                            >
                                <BarChart
                                    id="abs"
                                    play={true}
                                    variant="scroll"
                                    type="abs"
                                    categorySize="md"
                                    data={data.map(row => ({
                                        category: `${row.country.text}`,
                                        value: Number(row.qty.value),
                                        targetValue: Number(row.qty.value) * Math.random() * 2,
                                    }))}
                                />
                            </ChartCard>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <ChartCard
                                title="Some important measure by product group"
                                subtitle="Values are in m2"
                                description={<span>
                                    Compare numbers with their targets and judge if the progress is as it was supposed to be.
                                </span>}
                                color={colPal[0]}
                            >
                                <BarChart
                                    id="absDelta"
                                    play={true}
                                    variant="scroll"
                                    type="abs-delta"
                                    categorySize="md"
                                    data={data.map(row => ({
                                        category: `${row.division.text}`,
                                        value: Number(row.qty.value),
                                        targetValue: Number(row.qty.value) * Math.random() * 2,
                                    }))}
                                />
                            </ChartCard>
                        </Grid>
                    </Grid>
                )}
        </AppLayout>
    )
};

export default Dashboard;
