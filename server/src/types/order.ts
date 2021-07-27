import mongoose, { ObjectId } from 'mongoose';

type Product = {
    id: ObjectId;
};

export interface IOrder extends mongoose.Document {
    items: Array<Product>;
    user: null | string;
    date: Date;
    price: number;
};