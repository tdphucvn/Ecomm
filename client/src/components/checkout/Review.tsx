import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


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



const Review = (props) => {
    const classes = useStyles();
    const [cart, setCart] = useState<Array<Item>>([]);
    const { items: cartItems, total } = useSelector((state: RootState) => state.cart);
    const { products } = useSelector((state: RootState) => state.products);

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
        <div>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {cart.map((product) => (
                <ListItem className={classes.listItem} key={product.name}>
                  <ListItemText primary={product.name} secondary={`Amount: ${product.amount}`} />
                  <Typography variant="body2">${product.price}</Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  ${total}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Shipping
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Name</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{`${props.address.firstName} ${props.address.lastName}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>First Address</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{props.address.address1}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Second Address</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{props.address.address2}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Country</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{`${props.address.city} ${props.address.zip} ${props.address.country} ${props.address.state}`}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Payment details
                </Typography>
                <Grid container>
                    <Grid item xs={6}>
                      <Typography gutterBottom>Card Holder</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{props.payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>Card Number</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{props.payment.cardNum}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>Expire Date</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{props.payment.expire}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>CVV</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{props.payment.cvv}</Typography>
                    </Grid>
                </Grid>
              </Grid> */}
            </Grid>
        </div>
    )
}

export default Review
