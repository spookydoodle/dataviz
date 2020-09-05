import React from 'react';
import { useStyles } from '../styles/main';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

interface Props {
    title: string;
    subtitle: string;
    description?: any;
    color: string;
    content: any;
}

const Dashboard = ({
    title,
    subtitle,
    description = undefined,
    color,
    content 
}: Props) => {
    const classes = useStyles();
    return (
        <Card>
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
                {content}
            </CardContent>
        </Card>
    )
};

export default Dashboard;
