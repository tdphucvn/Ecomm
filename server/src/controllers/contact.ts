import {Request, Response} from 'express';
import Newsletter from '../model/Newsletter';
import { INewsletter } from '../types/newsletter';

type Newsletter = {
    email: string;
};

export const getNewsletterEmail = async (req: Request, res: Response) => {
    try {
        const data: Newsletter = req.body as Pick<Newsletter, "email">;
        const emailExists = await Newsletter.findOne({email: data.email});
        if(emailExists) throw new Error('Email already exists!');
        const newEmail: INewsletter = new Newsletter({
            email: data.email,
        });
        await newEmail.save();
        res.json({message: 'Thank you for sharing your email.'});    
    } catch (err) {
        res.status(400).json({message: err.message});
    };
};