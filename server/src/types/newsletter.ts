import mongoose from 'mongoose';

export interface INewsletter extends mongoose.Document{
    email: string;
    date: Date;
};