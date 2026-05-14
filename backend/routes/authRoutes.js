import express from 'express';
import { signUpUser, logInUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signUp', signUpUser);
router.post('/logIn', logInUser);

export default router;