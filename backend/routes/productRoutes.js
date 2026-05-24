import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
const router = express.Router();

router.post('/add', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct); 

export default router;