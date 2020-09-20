import React from 'react';
import { useStyles } from '../styles/main';
import { Card, CardHeader, CardActions, CardContent, Typography } from '@material-ui/core';
import { Children } from '../logic/types';

interface Props {
    title: string;
    subtitle: string;
    description?: any;
    color: string;
    actionItems?: Array<any>
    children: Children;
}

const Dashboard = ({
    title,
    subtitle,
    description = undefined,
    color,
    actionItems,
    children 
}: Props) => {
    const classes = useStyles();
    return (
        <Card style={{height: "100%"}}>
            <CardHeader
                title={title}
                subheader={subtitle}
            />

            {description ? <CardContent>
                <Typography variant="body1">
                    {description}
                </Typography>
            </CardContent> : null}

            <CardContent className={classes.flexCenter}>
                {children}
            </CardContent>

            <CardActions disableSpacing>
                {actionItems}
            </CardActions>
        </Card>
    )
};

export default Dashboard;
