import React, {useState, useEffect} from 'react';
import { makeStyles, TextField, Select, MenuItem, Button, FormControl, InputLabel, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { getCertainProductById } from '../../api/products';
import { editProduct } from '../../api/products';
import { unauthorized, updateAccessToken } from '../../redux/reducers/authenticate';


const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: '30px auto',
    },
    productForm: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    imageUpload: {
        display: 'none'
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
            height: 500,
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
    input: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    widthMargin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 150
    }
}));

type Params = {
    id: string;
};

type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: {
        url: string;
        public_id: string;
    };
    category: string;
};

const ProductEdit = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(false);
    const [editedProduct, setEditedProduct] = useState<Product>()
    const [name, setName] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>();
    const [category, setCategory] = useState<string>('electronics');
    const { products } = useSelector((state: RootState) => state.products);
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const { id } = useParams<Params>();

    useEffect(() => {
        setLoading(true);
        let itemInRedux: boolean = false;
        products.forEach((product) => {
            if(product._id === id) { itemInRedux = true; setEditedProduct(product); setLoading(false); return; };
        });
        if(itemInRedux) return;
        getCertainProductById(id).then((res : any) => setEditedProduct(res.payload.product))
    }, [id, products]);

    useEffect(() => {
        if(editedProduct){
            setCategory(editedProduct.category);
            setName(editedProduct.name);
            setPrice(editedProduct.price);
            setDescription(editedProduct.description);
        };
    }, [editedProduct])

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string);   
    };

    const handleEditItem = (e: React.SyntheticEvent) => {
        e.preventDefault();
        editProduct(id, name, price, description, category, accessToken)
            .then(res => {
                console.log(res);
                if(res.status === 200) { if(res.data.accessToken) {dispatch(updateAccessToken(res.data.accessToken));}; history.push('/manage'); return; };
                if(res.status === 400) { alert(res.data.message); return; };
                if(res.status === 401) { alert('Unauthorized'); dispatch(unauthorized()); return; };
            });
    };

    if(!loading && editedProduct) return (
        <div className={classes.container}>
            <form className={classes.productForm} onSubmit={handleEditItem}>
                <div className={classes.imageContainer}>
                    <img src={editedProduct.image.url} alt="" />
                </div>
                <div  className={classes.productsDetails}>
                    <TextField id="product-name" label="Product Name" name="name" variant="outlined" fullWidth className={classes.input} defaultValue={editedProduct.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                    <TextField id="product-price" label="Price ($)" name="price" variant="outlined" type="number" fullWidth className={classes.input} defaultValue={editedProduct.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))}/>
                    <TextField id="product-description" label="Description" name="description" variant="outlined" multiline rows={5} fullWidth className={classes.input} defaultValue={editedProduct.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
                    <FormControl style={{width: 150}}>
                        <InputLabel id="category-select-label" style={{width: 150}}>Category</InputLabel>
                        <Select labelId="category-select-label" className={classes.widthMargin} value={category} onChange={handleCategoryChange}>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="homeDecor">Home Decor</MenuItem>
                            <MenuItem value="grocery">Grocery</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" className={classes.widthMargin}>{loading ? <CircularProgress style={{color: 'white'}} /> : 'Save Changes' }</Button>
                </div>
            </form>
        </div>
    )
    return (
        <div>H</div>
    )
};

export default ProductEdit;
