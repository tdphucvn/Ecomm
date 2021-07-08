import mongoose from 'mongoose';

export interface IUser extends mongoose.Document{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    date: Date;
    admin: boolean
};