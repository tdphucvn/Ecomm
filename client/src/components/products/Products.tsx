import React, {useState} from 'react';
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
    productsID: Array<string>;
    setProductsID: React.Dispatch<React.SetStateAction<string[]>>;
};

const Products = (props: Props) => {
    const classes = useStyles();
    const [sort, setSort] = useState<string>('none');
    const [filter, setFilter] = useState<string>('all');

    return (
        <div className={classes.container}>
            <Filters sortState={sort} sortStateFunction={setSort} filterState={filter} filterStateFunction={setFilter} />
            <DisplayProducts sortState={sort} filterState={filter} productsID={props.productsID} setProductsID={props.setProductsID} />
        </div>
    )
}

export default Products
