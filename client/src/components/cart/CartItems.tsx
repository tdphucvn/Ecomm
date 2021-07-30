import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromCart } from '../../redux/reducers/cartSlice';

import { Typography, Divider, IconButton, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto',
        minHeight: '45vh',
        display: 'flex',
        flexDirection: 'column',
    },
    itemsList: {
        flex: 1,
    }, 
    listItemImage: {
        width: 100,
        height: 100,
        borderRadius: 7
    },
    itemDescription: {
        paddingLeft: theme.spacing(2),
        flex: 1
    },
    input: {
        width: 64
    },
}));

type Item = {
    id: string;
    name: string;
    price: number;
    image: {
        url: string;
        public_id: string;
    };
    amount: number;
};

const CartItems = () => {
    const classes = useStyles();
    const [cart, setCart] = useState<Array<Item>>([]);
    const { items: cartItems } = useSelector((state: RootState) => state.cart);
    const { products } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setCart([]);
        const itemsMap = new Map();
        for(let i in cartItems) {
            if(itemsMap.has(cartItems[i]._id)){
                let amount = itemsMap.get(cartItems[i]._id);
                itemsMap.set(cartItems[i]._id, ++amount);
                continue;
            };
            itemsMap.set(cartItems[i]._id, 1);
        };
    
        for (let [key, value] of itemsMap) {
            const findedProduct = products.find(product => product._id === key);
            if(findedProduct === undefined) continue;
            const {name, price, image} = findedProduct;
            const item: Item = {
                id: key,
                name,
                price,
                image,
                amount: value,
            };
            setCart((currentCart) => ([...currentCart, item]));
        };    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems, products]);

    return (
        <div className={classes.container}>
            <List className={classes.itemsList}>
                {cart && cart.map(item => (
                    <ListItem style={{padding: '10px 0'}} key={item.id}>
                        <ListItemAvatar>
                            <img src={item.image.url} alt={item.name} className={classes.listItemImage}/>
                        </ListItemAvatar>
                        <div className={classes.itemDescription}>
                            <Typography variant="h5" component="h3">{item.name}</Typography>
                            <Typography variant="body1" color="textSecondary">${item.price}</Typography>
                        </div>
                        <TextField label="Amount" value={item.amount} disabled variant="outlined" className={classes.input}/>
                        <IconButton aria-label="delete" onClick={() => dispatch(removeFromCart({id: item.id, price: item.price, amount: item.amount}))} style={{width: 64, height: 64}}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Divider></Divider>
        </div>
    )
}

export default CartItems;
