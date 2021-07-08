import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import DisplayTopProducts from '../shared/DisplayTopProducts';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: theme.spacing(4),
    },
}));

const Collection = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h4" component="h2">Our handpicked collection just for you</Typography>
            <DisplayTopProducts />
            <DisplayTopProducts />
            <DisplayTopProducts />
        </div>
    )
}

export default Collection
