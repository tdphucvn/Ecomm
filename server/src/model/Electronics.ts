import mongoose, { Schema, model } from 'mongoose';
import { IProduct } from '../types/products';

const electronics: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    descripition: {
        type: Object,
    },
    rating: {
        type: Number,
    },
    soldPieces: {
        type: Number,
        default: 0,
    },
    image: {
        type: Buffer,
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now
    },
});

export default model<IProduct>('electronics', electronics);