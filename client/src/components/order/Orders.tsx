import React, {useState, useEffect} from 'react';
import { getAllOrders } from '../../api/order';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateAccessToken } from '../../redux/reducers/authenticate';

import { Link as RouterLink } from 'react-router-dom';
import { Container , makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    orderLink: {
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: '#EFEFEF',
        }
    }
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
        <Container maxWidth="lg" className={classes.container}>
            <Typography component="h2" variant="h5" gutterBottom>Your Orders</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders ? orders.map((order: OrderType) => {
                        const date = order.date.split('T')[0];
                        return (
                            <TableRow component={RouterLink} to={`/orders/${order._id}`} className={classes.orderLink} key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{date}</TableCell>
                                <TableCell>{order.items.length}</TableCell>
                                <TableCell>{order.price}</TableCell>
                            </TableRow>
                        )
                    }) : 
                        <TableRow>
                            <TableCell>None</TableCell>
                            <TableCell>None</TableCell>
                            <TableCell>None</TableCell>
                            <TableCell>None</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </Container>
    )
}

export default Orders;
