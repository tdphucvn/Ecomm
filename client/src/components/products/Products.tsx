import React from 'react';
import DisplayProducts from './DisplayProducts';
import Filters from './Filters';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: theme.spacing(4),
    },
}));

type Props = {
    sortMethod: string | undefined
}

const Products = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Filters filterMethod={props.sortMethod} />
            <DisplayProducts />
        </div>
    )
}

export default Products
