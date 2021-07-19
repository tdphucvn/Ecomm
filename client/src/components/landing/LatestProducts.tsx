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
            <DisplayTopProducts category="homeDecor" title="Most Exclusive Decor"/>
            <DisplayTopProducts category="electronics" title="Best Quality For a Reasonable Price"/>
            <DisplayTopProducts category="grocery" title="Freshest Goods On The Marketplace"/>
        </div>
    )
}

export default LatestProducts
