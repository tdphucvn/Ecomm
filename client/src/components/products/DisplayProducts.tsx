import React, {useState, useEffect} from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button, makeStyles, Grid, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsRequest } from '../../redux/reducers/productsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { addToCart } from '../../redux/reducers/cartSlice';
 
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
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products)

    useEffect(() => {
        setLoading(true);
        const { sortState, filterState } = props;
        dispatch(getProductsRequest({sortState, filterState}))
            .then(res => {
                console.log(res);
                setLoading(false);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sortState, props.filterState]);

    if(products.length !== 0) {
        return (
            <Grid container spacing={3} className={classes.productsContainer}>
            { products.map(product => (
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
                            <Button color="primary" variant="outlined" onClick={() => dispatch(addToCart(product))}>Add to cart</Button>
                            <Button color="primary">View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )) }
            </Grid>
        );
    } else if(!loading && products.length === 0) {
        return (
            <div className={classes.loadingContainer}>
                <CircularProgress />
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
