import React, {useState} from 'react';
import Products from '../products/Products';
import { Button, makeStyles, CircularProgress } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteProductsRequest } from '../../redux/reducers/productsSlice';
import { updateCart } from '../../redux/reducers/cartSlice';
import { unauthorized, updateAccessToken } from '../../redux/reducers/authenticate';


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
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(1)
        }
    },
    addButton: {
        '& span': {
            textAlign: 'center',
        },
    }
}));

const Manage = () => {
    const [productsIDDelete, setProductsIDDelete] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const { accessToken } = useSelector((state: RootState) => state.auth);

    const handleDeleteProducts = () => {
        if(productsIDDelete.length === 0) { alert('You have not chosen any product.'); return }
        setLoading(true);
        dispatch(deleteProductsRequest({productsIds: productsIDDelete, accessToken}))
            .then((res: any) => {
                setProductsIDDelete([]);
                if(res.payload.status === 200) {if(res.payload.data.accessToken) dispatch(updateAccessToken(res.payload.data.accessToken))};
                if(res.payload.status === 401) {alert('You are not authorized'); dispatch(unauthorized()); return};
                if(res.payload.status === 400) {alert('Something went wrong'); return};
                alert('Successfully deleted');
                dispatch(updateCart(res.payload));
            })
            .then(() => setTimeout(() => setLoading(false), 500));
    };
    

    return (
        <div>
            <div className={classes.container}>
                <Button variant="contained" color="primary" component={RouterLink} to="/manage/add" className={classes.addButton}>Add Product</Button>
                <Button variant="contained" color="secondary" className={classes.deleteButton} onClick={handleDeleteProducts}>{loading ? <CircularProgress style={{color: 'white'}} /> : 'Delete Products' }</Button>
            </div>
            <Products productsID={productsIDDelete} setProductsID={setProductsIDDelete} />
        </div>
    )
}

export default Manage
