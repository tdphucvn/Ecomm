import React, {useState, useEffect} from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button, makeStyles, Grid, CircularProgress, Checkbox } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsRequest } from '../../redux/reducers/productsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { addToCart } from '../../redux/reducers/cartSlice';



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
    product: {
        position: 'relative'
    },
    checkBox: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 3,
        '& svg': {
            background: 'white',
        }
    }, 
}));

type Props = {
    sortState: string;
    filterState: string;
    productsID: Array<string> | undefined | null;
    setProductsID: React.Dispatch<React.SetStateAction<string[]>> | undefined | null;

};

const DisplayProducts = (props: Props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(true);
    const [productsIDDelete, setProductsIDDelete] = [props.productsID, props.setProductsID];
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const { admin } = useSelector((state: RootState) => state.auth);

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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        if(checked) {
            setProductsIDDelete((currentArr) => ([...currentArr, e.target.value]));
            return;
        };
        setProductsIDDelete((currentArr) => (currentArr.filter(id => id !== e.target.value)));
    };

    if(products && products.length !== 0) {
        return (
            <Grid container spacing={3} className={classes.productsContainer}>
            { products.map(product => (
                <Grid item md={4} sm={6} xs={12} key={product.image.public_id} className={classes.product}>
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
                    {admin && <Checkbox color="secondary" className={classes.checkBox} value={product._id} onChange={handleCheckboxChange}/>}
                </Grid>
            )) }
            </Grid>
        );
    } else if(!loading && products && products.length === 0) {
        return (
            <div className={classes.loadingContainer}>
                <Typography>No products founded</Typography>
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
