import { Request, Response } from 'express';
import Order from '../model/Order';

export const getYourOrders =  async ( req: Request | any, res: Response ) => {
  try {
    const { user } = req.decoded;
    const { _id: id } = user;
    const orders = await Order.find({user: id});
  
    const newAccessToken = req.accessToken;
    if(newAccessToken) { res.send({ orders, newAccessToken }); return; }
    res.send({orders, newAccessToken: null});  
  } catch (error) {
    console.log(error);
    res.status(500).send({message: new Error('Something went wrong')});
  };
};

export const getCertainOrder = async (req: Request | any, res: Response) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.findById(orderId);
    res.status(200).send({order});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: new Error('Something went wrong')});
  };
};