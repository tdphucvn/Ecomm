import {Request, Response} from 'express';
import Products from '../model/Products';
import { IProduct } from '../types/products';

type Query = {
    category: string;
};

type EmptyQuery = {};

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY,
});


export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const {sort, filter} = req.query;
        let query: Query | EmptyQuery = {};
        let sortQuery = {};
        switch(filter){
            case 'all':
                query = {};
                break;
            case 'electronics':
                query = {category: 'electronics'};
                break;
            case 'homeDecor': 
                query = {category: 'homeDecor'};
                break;
            case 'grocery':
                query = {category: 'grocery'};
                break;
            default:
                break;
        };
        switch(sort){
            case 'none':
                sortQuery = {};
                break;
            case 'alpha':
                sortQuery = {'name': 1};
                break;
            case 'price': 
                sortQuery = {'price': -1};
                break;
            case 'popularity':
                sortQuery = {'rating': 1};
                break;
            default:
                break;
        };
        const fetchedProducts = await Products.find(query).sort(sortQuery);
        const numberOfProducts: number = await Products.countDocuments();
        const numberOfPages: number = Math.ceil(numberOfProducts / 6);
        res.json({message: "Success fetch", fetchedProducts, numberOfPages});
    } catch (error) {
        console.log(error);  
    };
};

export const getCertainItemDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        res.json({message: 'Item finded in DB', product})  
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Something went wrong'});
    };
};

export const addProduct = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const { name, price, description, file, category } = req.body;
        const uploadResponse = await cloudinary.uploader.upload(file, {
            upload_preset: 'products',
        });
        const { url, public_id } = uploadResponse;

        const newProduct: IProduct = new Products({
            name,
            price: parseInt(price),
            description: description,
            image: {
                url,
                public_id,
            },
            category,
        });

        const savedProduct = await newProduct.save();
        const accessToken = req.accessToken;
        if(!accessToken) {res.json({message: 'Product added', savedProduct}); return;}
        res.json({message: 'Product added', savedProduct, accessToken});    
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong' });
    };
};

export const deleteProducts = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const accessToken = req.accessToken;
        const arrayOfProductsIDs = req.body.products;
        let arrayOfProducts: Array<IProduct> = [];
        const error = arrayOfProductsIDs.forEach(async (productId: string, index: number) => {
            try {
                const product: IProduct | null = await Products.findById(productId);
                if(product === null) throw Error('Item is not in the database')
                if(product !== null) {
                    arrayOfProducts.push(product);
                    const { image: { public_id: imageId } } = product;
                    cloudinary.uploader.destroy(imageId, async (err: any, res: any) => {if(err){throw err}; console.log(res)});
                    await product.remove();
                }
                console.log(index, arrayOfProductsIDs, arrayOfProductsIDs.length - 1);
                if(index == arrayOfProductsIDs.length - 1) {
                    console.log('Deleted everything');
                    if(!accessToken) {res.json({message: 'Deleted', arrayOfProductsIDs: arrayOfProductsIDs}); return;}
                    res.json({message: 'Deleted', arrayOfProductsIDs: arrayOfProductsIDs, accessToken});
                    return;
                };
            } catch (error) {
                res.status(400).json({message: error.message})
                return;
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error});
    };
};

export const editProduct = async (req: Request | any, res: Response) => {
    try {
        const { productID, name, price, description, category } = req.body;
        const product = await Products.findByIdAndUpdate(productID, {name, price, description, category}, (err, docs) => {
            if(err) console.log(err);
            else console.log('Updated user: ', docs);
        });

        const accessToken = req.accessToken;
        if(!accessToken) {res.json({message: 'Succesfully updated', product}); return;}
        res.json({message: 'Succesfully updated', product, accessToken});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Product is not in the database'});
    };
};

export const getCollection = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        let collectionProducts;
        switch(query.category){
            case 'ontheedge':
                collectionProducts = await Products.find({category: 'homeDecor'}).sort({"price" : -1}).limit(3);
                break;
            case 'masterofthenight':
                collectionProducts = await Products.find({category: 'electronics'}).sort({"price": -1}).limit(3);
                break;
            case 'nevermore':
                collectionProducts = await Products.find({category: 'grocery'}).sort({"price": -1}).limit(3);
                break;
            default:
                collectionProducts = await Products.find(query).sort({ "soldPieces" : -1 }).limit(3);
                break;
        }
        res.json({products: collectionProducts});
    } catch (error) {
        console.log(error);
    };
};