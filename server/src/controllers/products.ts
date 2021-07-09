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
    const {sort, filter} = req.query;
    let query: Query | EmptyQuery = {};
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
    const fetchedProducts = await Products.find(query).sort({});
    const numberOfProducts: number = await Products.countDocuments();
    const numberOfPages: number = Math.ceil(numberOfProducts / 6);
    res.json({message: "Success fetch", fetchedProducts, numberOfPages});
};

export const getCertainItemDetails = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    res.json({message: "Item Details not provided", id});
};

export const postSearchItem = async (req: Request, res: Response): Promise<void> => {
    res.json({search:'Search Item'});
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, description, file, category } = req.body;
        const uploadResponse = await cloudinary.uploader.upload(file, {
            upload_preset: 'products',
        });
        const { url, public_id } = uploadResponse;

        console.log(description);

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

        res.json({message: 'Product added', savedProduct});    
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong' });
    };
};