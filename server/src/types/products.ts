import mongoose from 'mongoose';

type Description = {
    overview: string,
    params: Array<string>,
};

export interface IProduct extends mongoose.Document{
    name: string;
    price: number;
    description: Description;
    rating: number;
    soldPieces: number;
    image: Buffer;
    date: Date;
};