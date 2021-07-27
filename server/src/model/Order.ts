import mongoose, { model, Schema } from 'mongoose';
import { IOrder } from '../types/order';

const orderSchema: Schema = new mongoose.Schema({
    items: {
        type: Array,
        required: true,
    },
    user: {
        type: String || null,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        required: true,
    },
});

export default model<IOrder>('order', orderSchema);