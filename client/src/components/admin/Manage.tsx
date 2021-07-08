import React from 'react';
import Products from '../products/Products';
import { Button, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(4),
    }
}));

const Manage = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.container}>
                <Button variant="contained" color="primary" component={RouterLink} to="/manage/add">Add Product</Button>
            </div>
            <Products sortMethod={"all"}/>
        </div>
    )
}

export default Manage
