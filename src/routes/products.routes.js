import express from 'express';
const router = express.Router();

import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { authentication } from '../middlewares/authentication.js';

// Rutas de productos

// Ruta GET (pública)
router.get('/products', getAllProducts);

// Ruta GET por ID (pública)
router.get('/products/:id', getProductById);

// Ruta POST (protegida con JWT)
router.post('/products/create', authentication, createProduct);

// Alias de la ruta de creación (protegida con JWT)
router.post('/products', authentication, createProduct);

// Ruta PUT (protegida con JWT)
router.put('/products/:id', authentication, updateProduct);

// Ruta DELETE (protegida con JWT)
router.delete('/products/:id', authentication, deleteProduct);

export default router;
