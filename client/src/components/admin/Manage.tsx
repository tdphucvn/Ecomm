import React, {useState, useEffect} from 'react';
import Products from '../products/Products';
import { Button, makeStyles, CircularProgress } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteProductsRequest } from '../../redux/reducers/productsSlice';
import { updateCart } from '../../redux/reducers/cartSlice';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(4),
    },
    deleteButton: {
        marginLeft: theme.spacing(3),
    }
}));

const Manage = () => {
    const [productsIDDelete, setProductsIDDelete] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);

    const handleDeleteProducts = () => {
        if(productsIDDelete.length === 0) { alert('You have not chosen any product.'); return }
        setLoading(true);
        dispatch(deleteProductsRequest(productsIDDelete))
            .then(res => {
                console.log(res);
                dispatch(updateCart(res.payload));
            })
            .then(() => setTimeout(() => setLoading(false), 500));
    };
    

    return (
        <div>
            <div className={classes.container}>
                <Button variant="contained" color="primary" component={RouterLink} to="/manage/add">Add Product</Button>
                <Button variant="contained" color="secondary" className={classes.deleteButton} onClick={handleDeleteProducts}>{loading ? <CircularProgress color="secondary" /> : 'Delete Products' }</Button>
            </div>
            <Products productsID={productsIDDelete} setProductsID={setProductsIDDelete} />
        </div>
    )
}

export default Manage
