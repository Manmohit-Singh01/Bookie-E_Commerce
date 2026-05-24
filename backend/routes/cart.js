import express from 'express';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart);               //add item to cart  
router.get('/:userId', getCart);              //get cart for a user
router.post('/remove', removeFromCart);       //remove item from cart
router.post('/update', updateQuantity);       //update item quantity in cart