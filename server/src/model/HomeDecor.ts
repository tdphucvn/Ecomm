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
    category: {
        type: String,
        default: 'homeDecor',
    },
});

export default model<IProduct>('homeDecor', homeDecor);