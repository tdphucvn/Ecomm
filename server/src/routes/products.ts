import express, {Request, Response} from 'express';
const router = express.Router();

import { getItems, getCertainItemDetails, postSearchItem } from '../controllers/products';

router.get('/', getItems);
router.get('/:id', getCertainItemDetails)
router.post('/search', postSearchItem)

export default router;