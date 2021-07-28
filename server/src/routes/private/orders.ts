import express from 'express';
import authenticate from '../../middleware/auth';
import { getYourOrders, getCertainOrder } from '../../controllers/order';

const router = express.Router();
router.use(authenticate);

router.get('/', getYourOrders);
router.get('/:id', getCertainOrder);

export default router;