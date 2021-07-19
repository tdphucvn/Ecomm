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
            <DisplayTopProducts category="ontheedge" title="On the Edge"/>
            <DisplayTopProducts category="masterofthenight" title="Master of the Night"/>
            <DisplayTopProducts category="nevermore" title="Never More"/>
        </div>
    )
}

export default Collection
