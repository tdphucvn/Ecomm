import React, {useState, useEffect} from 'react';
import { getAllOrders } from '../../api/order';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateAccessToken } from '../../redux/reducers/authenticate';

import { Link as RouterLink } from 'react-router-dom';
import { Container , makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        minHeight: '50vh',
    },
}));

type Item = {
    category: string;
    date: string;
    name: string;
    price: number;
    image: {
        url: string;
        public_id: string;
    };
    description: string;
    _id: string;
};

type OrderType = {
    date: string;
    items: Array<Item>;
    price: number;
    _id: string;
}

const Orders = () => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const [orders, setOrders] = useState<Array<OrderType>>([]);
    const { accessToken } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        getAllOrders(accessToken)
            .then(data => {
                const { orders, newAccessToken } = data;
                setOrders(orders);
                if(newAccessToken === null) return;
                dispatch(updateAccessToken(newAccessToken));
            })
            .catch(err => console.log(err));
    }, [accessToken, dispatch]);

    return (
        <div className={classes.container}>
            <Typography component="h2" variant="h5" gutterBottom>Your Orders</Typography>
            { 
                orders ?
                <div style={{overflowX: 'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order: OrderType) => {
                                const date = order.date.split('T')[0];
                                return (
                                    <TableRow  key={order._id}>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>{order.items.length}</TableCell>
                                        <TableCell>{order.price}</TableCell>
                                        <TableCell><Button component={RouterLink} to={`/orders/${order._id}`}>Details</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>          
                    </Table>
                </div> 
                : <CircularProgress color="primary" /> 
            }

        </div>
    )
}

export default Orders;
