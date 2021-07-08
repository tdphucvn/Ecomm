import React from 'react';
import {  makeStyles } from '@material-ui/core';
import DisplayTopProducts from '../shared/DisplayTopProducts';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto',
    },
}));

const LatestProducts = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <DisplayTopProducts />
            <DisplayTopProducts />
            <DisplayTopProducts />
        </div>
    )
}

export default LatestProducts
