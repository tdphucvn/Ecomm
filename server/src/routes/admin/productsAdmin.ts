import express from 'express';
const router = express.Router();

import { addProduct, deleteProducts } from '../../controllers/products';
import authenticateAdmin from '../../middleware/authAdmin';

router.use(authenticateAdmin);

router.post('/addProduct', addProduct);
router.post('/delete', deleteProducts);

export default router;