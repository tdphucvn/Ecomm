import React, {useState} from 'react';
import { Typography, makeStyles, TextField, Select, MenuItem, Button, FormControl, InputLabel, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router';

import { addProduct } from '../../api/products';

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
        minWidth: 450,
        height: 500,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid gray',
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
        minWidth: 450,
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

const ProductAdd = () => {
    const classes = useStyles();
    const [url, setURL] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('electronics')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const history = useHistory();

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) {
            const file: File = e.target.files[0]
            setImageFile(file);
            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!");

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.");
            setURL(URL.createObjectURL(file))
        } else {
            alert('File does not exist');
        };
    };

    const handleSavingChanges = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
            price: { value: number };
            description: { value: string };
        };

        console.log(target.name.value, target.price.value, target.description.value, imageFile, category);
        const name = target.name.value;
        const price = target.price.value;
        const description = target.description.value;

        const reader = new FileReader();
        if(imageFile !== null) {
            reader.readAsDataURL(imageFile);
            reader.onloadend = () => {
                const file = reader.result;
                setLoading(true);
                addProduct(name, price, description, file, category)
                    .then(res => {console.log(res); setLoading(false); history.push('/manage')})
                    .catch(err => console.log(err)) 
            };
        }

    };

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string);   
    };

    return (
        <div className={classes.container}>
            <form className={classes.productForm} onSubmit={handleSavingChanges}>
                <div className={classes.imageContainer}>
                    <input accept="image/*" className={classes.imageUpload} id="contained-button-file" type="file" name="image" onChange={handleUploadImage} />
                    <label htmlFor="contained-button-file">
                        {url === '' ? <Button variant="contained" color="primary" component="span">
                            Upload
                        </Button> :
                            <img src={url} alt="poster" />
                        }
                    </label>
                </div>
                <div  className={classes.productsDetails}>
                    <TextField id="product-name" label="Product Name" name="name" variant="outlined" fullWidth className={classes.input}/>
                    <TextField id="product-price" label="Price ($)" name="price" variant="outlined" type="number" fullWidth className={classes.input}/>
                    <TextField id="product-description" label="Description" name="description" variant="outlined" multiline rows={5} fullWidth className={classes.input}/>
                    <FormControl style={{width: 150}}>
                        <InputLabel id="category-select-label" style={{width: 150}}>Category</InputLabel>
                        <Select labelId="category-select-label" className={classes.widthMargin} value={category} onChange={handleCategoryChange}>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="homeDecor">Home Decor</MenuItem>
                            <MenuItem value="grocery">Grocery</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" className={classes.widthMargin}>{loading ? <CircularProgress color="secondary" /> : 'Save Changes' }</Button>
                </div>
            </form>
        </div>
    )
}

export default ProductAdd
