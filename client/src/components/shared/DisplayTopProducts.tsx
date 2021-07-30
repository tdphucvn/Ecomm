import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Button, CardActions, makeStyles, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartSlice';
import { AppDispatch } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
    section: {
        width: '100%',
        margin: '50px 0'
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
}));

type Props = {
    category: string;
    title: string;
};

type Product = {
    category: string;
    description: string;
    image: {
        url: string;
        public_id: string;
    };
    name: string;
    price: number;
    _id: string;
};

const DisplayTopProducts = (props: Props) => {
    const classes = useStyles();
    const [category, setCategory] = useState<string>('');
    const [products, setProducts] = useState<Array<Product>>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setCategory(props.category);
    }, [props.category]);

    useEffect(() => {
        if(category === '') return;
        axios.get(`/api/products/collection?category=${category}`)
            .then(res => setProducts(res.data.products))
            .catch(err => console.log(err));
    }, [category]);

    if(products && products.length > 0) return (
        <section className={classes.section}>
            <Typography variant="h4" align="center" gutterBottom={true}>{props.title}</Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item md={4} sm={6} xs={12} key={product._id}>
                        <Card>
                            <CardMedia image={product.image.url} className={classes.media} title="Product"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="h6">${product.price}</Typography>
                                    <Rating readOnly defaultValue={3.5} precision={0.5}/>
                                </div>
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button color="secondary" variant="outlined" onClick={() => dispatch(addToCart(product))}>Add to cart</Button>
                                <Button color="primary" component={RouterLink} to={`/product/${product._id}`} >View More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </section>
    )
    else return (
        <div>
            <CircularProgress color="primary"/>
        </div>
    )
}

export default DisplayTopProducts;
