import express from 'express';
import { getAddress, addAddress } from '../controllers/addressController.js';

const router = express.Router();

router.post('/add', addAddress);
router.get('/:userId', getAddress);

export default router;