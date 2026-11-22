import express from 'express';
const router = express.Router();

import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

// Rutas de productos

// Ruta GET
router.get('/products', getAllProducts);

// Ruta GET por ID
router.get('/products/:id', getProductById);

// Ruta POST
router.post('/products', createProduct);

// Ruta PUT
router.put('/products/:id', updateProduct);

// Ruta DELETE
router.delete('/products/:id', deleteProduct);



export default router;