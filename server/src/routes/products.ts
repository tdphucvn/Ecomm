import express from 'express';
const router = express.Router();

import { getProducts, getCertainItemDetails, postSearchItem, addProduct, deleteProducts } from '../controllers/products';

router.get('/', getProducts);
router.get('/:id', getCertainItemDetails);
router.post('/search', postSearchItem);
// router.post('/addProduct', addProduct);
// router.post('/delete', deleteProducts);

export default router;