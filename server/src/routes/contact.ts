import express, {Request, Response} from 'express';
const router = express.Router();

import { getNewsletterEmail } from '../controllers/contact';

router.post('/newsletter', getNewsletterEmail);

export default router;