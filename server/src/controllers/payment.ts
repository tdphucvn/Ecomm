import { Request, Response } from 'express';
const stripe = require("stripe")("sk_test_LEj8vct22bo1OxPiVQ0jixJA00JtivUCiB");
import Products from '../model/Products';
import { IProduct } from '../types/products';
import Order from '../model/Order';
import { IOrder } from '../types/order';

const findProductsInDB = (async (productsFromClient: Array<IProduct>) => {
  let productsFromDB = [];
  for ( const product of productsFromClient) {
    const ProductFromDB = await Products.findById(product._id);
    if(ProductFromDB ===  null) continue;
    productsFromDB.push(ProductFromDB);
  };
  return productsFromDB;
});

const calculateTotalPrice = (products: Array<IProduct>) => {
  return products.reduce((price: number, product: IProduct) => {
    return price + product.price;
  }, 0);
};

const getProductsIds = (products: Array<IProduct>) => {
  let idObject: any = {};
  products.forEach((product, index) => {
    const key = `item${index}`;
    const id = product._id;
    idObject[key] = id.toString();
  });
  return idObject;
};

const updateSoldPiecesInDB = async (products: Array<IProduct>) => {
  for (const product of products) {
    const UpdatedProduct = await Products.findByIdAndUpdate(product._id, { $inc: {soldPieces: 1} })
    if (UpdatedProduct === null) continue;
    UpdatedProduct.save();
  };
};

const createOrder = async (items: Array<IProduct>, price: number, userId: string | undefined) => {
    
    const order: IOrder = new Order({
        items,
        user: userId ? userId : null,
        price,
    });

    console.log(order);
    await order.save();
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { items, address: {city, country, address1, address2, zip, state, firstName, lastName} } = req.body;
  const productsFromDB = await findProductsInDB(items);
  if(productsFromDB === null) return;
  const price: number = calculateTotalPrice(productsFromDB);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "usd",
    shipping: {
      address: {
        city: city,
        country: country,
        line1: address1,
        line2: address2,
        postal_code: zip,
        state: state
      },
      name: `${firstName} ${lastName}`,
    },
    metadata: getProductsIds(productsFromDB)
  });
  await updateSoldPiecesInDB(productsFromDB);
  await createOrder(productsFromDB, price, req.cookies.userSession);
  res.send({
    clientSecret: paymentIntent.client_secret
  });
};