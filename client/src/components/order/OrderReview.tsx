import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateAccessToken } from '../../redux/reducers/authenticate';
import axios from 'axios';

import { Grid, List, ListItem, ListItemText, Typography, makeStyles, ListItemAvatar, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        minHeight: '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    listItemImage: {
        width: 100,
        height: 100,
        borderRadius: 7
    },
    itemDescription: {
        marginLeft: theme.spacing(2),
    }
}));

type Params = {
    id: string;
}

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

type ItemSummary = {
    id: string;
    name: string;
    price: number;
    image: {
        url: string;
        public_id: string;
    };
    amount: string;
}

type OrderType = {
    date: string;
    items: Array<Item>;
    price: number;
    _id: string;
    shippingInfo: {
        name: string;
        address1: string;
        address2: string;
        city: string;
        country: string;
        state: string;
        zip: number;
    };
};

const createHashmapFromPurchasedItems = (purchasedItems: Array<Item>, allProducts: Array<Item>) => {
    const itemsMap = new Map();
    let itemsSummary: Array<ItemSummary> = [];
    for(let i in purchasedItems) {
        if(itemsMap.has(purchasedItems[i]._id)){
            let amount = itemsMap.get(purchasedItems[i]._id);
            itemsMap.set(purchasedItems[i]._id, ++amount);
            continue;
        };
        itemsMap.set(purchasedItems[i]._id, 1);
    };
    
    for(let [key, value] of itemsMap) {
        const findedProduct = allProducts.find(product => product._id === key);
        if(findedProduct === undefined) continue;
        const {name, price, image} = findedProduct;
        const item: ItemSummary = {
            id: key,
            name,
            price,
            image,
            amount: value,
        };
        itemsSummary.push(item);
    }

    return itemsSummary;
};


const OrderReview = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<Params>();
    const [order, setOrder] = useState<OrderType>(undefined);
    const [items, setItems] = useState<Array<ItemSummary>>(undefined);
    
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const { products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${id}` , {withCredentials: true, headers: {ContentType: 'application/json', Authorization: `Bearer ${accessToken}`}})
            .then(res => {
                const {data} = res;
                setOrder(data.order);
                setItems(createHashmapFromPurchasedItems(data.order.items, products))
            })
            .catch(err => {
                console.log(err.response);
                alert(err.response.data.error);
                history.push('/');
            });

    }, [id, accessToken, products, history]);

    return (
        <div className={classes.container}>
            { order !== undefined && items !== undefined ? 
            <Grid container spacing={1}>
                <Grid item sm={12} xs={12}>
                    <Typography variant="h6" className={classes.title} gutterBottom>Purchased Items</Typography>
                    <List disablePadding>
                        {items.map((product: ItemSummary) => (
                            <ListItem key={product.id} className={classes.listItem}>
                                <ListItemAvatar>
                                    <img src={product.image.url} alt={product.name} className={classes.listItemImage}/>
                                </ListItemAvatar>
                                <ListItemText primary={product.name} secondary={`Amount: ${product.amount}`} className={classes.itemDescription}/>
                                <Typography variant="body2">${product.price}</Typography>
                            </ListItem>
                        ))}
                        <Divider></Divider>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Total" />
                            <Typography className={classes.total} variant="subtitle1">${order.price}</Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Typography variant="h6" className={classes.title} gutterBottom>Shipping Information</Typography>
                    <Grid container>
                        <Grid item xs={6}><Typography gutterBottom>Name</Typography></Grid>
                        <Grid item xs={6}><Typography gutterBottom>{order.shippingInfo.name}</Typography></Grid>
                        <Grid item xs={6}><Typography gutterBottom>First Address</Typography></Grid>
                        <Grid item xs={6}><Typography gutterBottom>{order.shippingInfo.address1}</Typography></Grid>
                        <Grid item xs={6}><Typography gutterBottom>Second Address</Typography></Grid>
                        <Grid item xs={6}><Typography gutterBottom>{order.shippingInfo.address2 === '' ? 'Not given' : order.shippingInfo.address2}</Typography></Grid>
                        <Grid item xs={6}><Typography gutterBottom>Country</Typography></Grid>
                        <Grid item xs={6}><Typography gutterBottom>{`${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.zip} ${order.shippingInfo.country}`}</Typography></Grid>
                    </Grid>
                </Grid>
            </Grid>
            : '' }
        </div>
    )
}

export default OrderReview
