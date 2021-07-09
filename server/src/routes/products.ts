import express, {Request, Response} from 'express';
const router = express.Router();

import { getProducts, getCertainItemDetails, postSearchItem, addProduct } from '../controllers/products';

router.get('/', getProducts);
router.get('/:id', getCertainItemDetails);
router.post('/search', postSearchItem);
router.post('/addProduct', addProduct);

export default router;