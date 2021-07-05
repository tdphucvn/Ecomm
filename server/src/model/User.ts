import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});  

export default model<IUser>('user', userSchema);