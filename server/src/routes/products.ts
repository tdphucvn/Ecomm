import express from 'express';
const router = express.Router();

import { getProducts, getCertainItemDetails, getCollection, addProduct, deleteProducts } from '../controllers/products';

router.get('/', getProducts);
router.get('/test', async (req, res) => {
    res.status(401).send('Hello');
})
router.get('/collection', getCollection);
router.get('/:id', getCertainItemDetails);

export default router;