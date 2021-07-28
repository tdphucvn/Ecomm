import { Request, Response } from 'express';
import Order from '../model/Order';

export const getYourOrders =  async ( req: Request | any, res: Response ) => {
  const { user } = req.decoded;
  const { _id: id } = user;
  const orders = await Order.find({user: id});

  const newAccessToken = req.accessToken;
  if(newAccessToken) { res.send({ orders, newAccessToken }); return; }
  res.send({orders, newAccessToken: null});
};

export const getCertainOrder = async (req: Request | any, res: Response) => {
  res.send({message: 'order'});
};