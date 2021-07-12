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
    const { id } = req.params
    res.json({message: "Item Details not provided", id});
};

export const postSearchItem = async (req: Request, res: Response): Promise<void> => {
    res.json({search:'Search Item'});
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

export const deleteProducts = async (req: Request, res: Response): Promise<void> => {
    try {
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
                    res.json({message: 'Deleted', arrayOfProductsIDs: arrayOfProductsIDs});
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