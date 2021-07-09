import mongoose from 'mongoose';

type Image = {
    url: string;
    public_id: string;
}

export interface IProduct extends mongoose.Document{
    name: string;
    price: number;
    description: string;
    rating: number;
    soldPieces: number;
    image: Image;
    date: Date;
};