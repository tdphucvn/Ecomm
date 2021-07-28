import mongoose, { ObjectId } from 'mongoose';

type Product = {
    id: ObjectId;
};

type ShippingInfo = {
    name: string;
    address1: string | null;
    address2: string | null;
    city: string;
    country: string;
    state: string;
    zip: number;
}
export interface IOrder extends mongoose.Document {
    items: Array<Product>;
    user: null | string;
    shippingInfo: ShippingInfo;
    date: Date;
    price: number;
};