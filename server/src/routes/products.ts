import express from 'express';
const router = express.Router();

import { getProducts, getCertainItemDetails, postSearchItem, addProduct, deleteProducts } from '../controllers/products';

router.get('/', getProducts);
router.get('/:id', getCertainItemDetails);
router.post('/search', postSearchItem);

export default router;