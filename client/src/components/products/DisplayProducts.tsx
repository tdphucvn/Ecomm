import React, {useState, useEffect} from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button, makeStyles, Grid, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import axios from 'axios';

type Image = {
    url: string;
    public_id: string;
}

type Product = {
    name: string;
    category: string;
    price: number;
    soldPieces: number;
    image: Image;
    description: string;
};

const useStyles = makeStyles((theme) => ({
    productsContainer: {
        margin: '30px 0',
        minHeight: '50vh',
    },
    loadingContainer:{
        height: '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
}));

type Props = {
    sortState: string;
    filterState: string;
};

const DisplayProducts = (props: Props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchedProductsArray, setFetchedProductsArray] = useState<Array<Product>>([]);

    useEffect(() => {
        setLoading(true);
        const { sortState, filterState } = props;
        console.log(sortState, filterState)
        axios.get(`http://localhost:5000/products?sort=${sortState}&filter=${filterState}`)
        .then(res => res.data.fetchedProducts)
        .then(fetchedProducts => {
            setTimeout(() => {setFetchedProductsArray(fetchedProducts);}, 500);
            console.log(fetchedProducts);
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sortState, props.filterState]);

    if(fetchedProductsArray.length !== 0) {
        return (
            <Grid container spacing={3} className={classes.productsContainer}>
            { fetchedProductsArray.map(product => (
                <Grid item md={4} sm={6} xs={12} key={product.image.public_id}>
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
                            <Button color="primary" variant="contained">Add to cart</Button>
                            <Button color="primary">View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )) }
            </Grid>
        );
    } else if(!loading && fetchedProductsArray.length === 0) {
        return (
            <div className={classes.loadingContainer}>
                <Typography variant="h6" component="h4">We haven't found any products that match the filter.</Typography>
            </div>
        )
    } else {
        return (
            <div className={classes.loadingContainer}>
                <CircularProgress />
            </div>
        )
    };
}

export default DisplayProducts
