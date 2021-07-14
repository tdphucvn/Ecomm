import express from 'express';
const router = express.Router();

import { addProduct, deleteProducts, editProduct } from '../../controllers/products';
import authenticateAdmin from '../../middleware/authAdmin';

router.use(authenticateAdmin);

router.post('/addProduct', addProduct);
router.post('/delete', deleteProducts);
router.put('/edit', editProduct);

export default router;