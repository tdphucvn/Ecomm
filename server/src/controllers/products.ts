import {Request, Response} from 'express';


export const getItems = async (req: Request, res: Response): Promise<void> => {
    res.json({message: "hello world from backend"});
};

export const getCertainItemDetails = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    res.json({message: "Item Details not provided", id});
};

export const postSearchItem = async (req: Request, res: Response): Promise<void> => {
    res.json({search:'Search Item'});
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    console.log(data);
    res.json({message: 'test upload'});
};