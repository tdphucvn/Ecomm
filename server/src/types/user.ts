import mongoose from 'mongoose';

export interface IUser extends mongoose.Document{
    username: string;
    password: string;
    email: string;
    date: Date;
};