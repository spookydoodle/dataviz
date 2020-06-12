import React from 'react';
import { useStyles } from '../styles/main';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';


const Dashboard = ({
    title,
    subtitle,
    description = undefined,
    color,
    content }) => {
    const classes = useStyles();
    return (
        <Card style={{ height: "100%" }}>
            <CardHeader
                title={title}
                subheader={subtitle}
                style={{ color: { color } }}
            />

            {description ? <CardContent>
                <Typography variant="body1">
                    {description}
                </Typography>
            </CardContent> : null}

            <CardContent className={classes.flexCenter}>
                {content}
            </CardContent>
        </Card>
    )
};

export default Dashboard;
