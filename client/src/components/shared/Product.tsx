import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getCertainProductById } from '../../api/products';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: '30px auto',
    },
    productForm: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    imageContainer: {
        minWidth: 350,
        height: 450,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        '& img': {
            display: 'block',
            width: '100%',
            height: 450,
            objectFit: 'cover', 
        },
    },
    productsDetails: {
        minWidth: 350,
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    widthMargin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 150
    },
    description: {
        minHeight: '30vh'
    }
}));

type Params = {
    id: string;
};

type ProductType = {
    _id: string;
    name: string;
    date: string;
    category: string;
    image: {
        url: string;
        public_id: string;
    };
    description: string;
    price: number;
    soldPieces: number;
};

const Product = () => {
    const classes = useStyles();
    const [product, setProduct] = useState<ProductType>();
    const { id } = useParams<Params>();
    const { products } = useSelector((state: RootState) => state.products);
    const { admin } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(products.length > 0) {
            let itemInRedux: boolean;
            products.forEach((product) => {
                if(product._id === id) {setProduct(product); itemInRedux = true ;return};
            });
            if(itemInRedux) {return};
            getCertainProductById(id).then((res : any) => setProduct(res.payload.product))
        };
    }, [id, products]);

    if(product) return (
        <div className={classes.container}>
            <div className={classes.productForm}>
                <div className={classes.imageContainer}>
                    <img src={product.image.url} alt="" />
                </div>
                <div className={classes.productsDetails}>
                    <Typography component="h2" variant="h4">{product.name}</Typography>
                    <Typography component="h4" variant="h6" style={{display: 'flex', alignItems: 'center'}}>${product.price}<Rating readOnly defaultValue={3.5} precision={0.5} style={{marginLeft: 10}}/></Typography>
                    <Typography color="textSecondary" gutterBottom>Sold pieces: {product.soldPieces}</Typography>
                    <Typography paragraph className={classes.description}>{product.description}</Typography>
                    {admin && 
                    <Button variant="contained" color="primary" className={classes.widthMargin} component={RouterLink} to={`/manage/edit/${product._id}`}>Edit</Button>
                    }
                </div>
            </div>
        </div>
    )

    return(
        <div>
            nothing
        </div>
    )
}

export default Product
