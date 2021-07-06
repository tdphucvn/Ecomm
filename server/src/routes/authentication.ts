import express from 'express';
import { loginRequest, registerRequest, logoutRequest } from '../controllers/authentication';

const router = express.Router();

//Login process
router.post('/login', loginRequest);
router.post('/register', registerRequest);
router.delete('/logout', logoutRequest);

export default router;