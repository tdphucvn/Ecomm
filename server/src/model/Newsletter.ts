import mongoose, { Schema, model } from 'mongoose';
import { INewsletter } from '../types/newsletter';

const newsletterSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default model<INewsletter>('newsletter', newsletterSchema);