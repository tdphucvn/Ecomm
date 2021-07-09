import mongoose, { Schema, model } from 'mongoose';
import { IProduct } from '../types/products';

const homeDecor: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    soldPieces: {
        type: Object,
        default: 0,
    },
    image: {
        type: Object,
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now
    },
    category: {
        type: String,
        required: true,
    },
});

export default model<IProduct>('products', homeDecor);