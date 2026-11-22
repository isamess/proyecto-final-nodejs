import * as productsService from "../services/product.service.js";


const products = [
{
id: 1,
name: 'Producto 1',
price: 1000
},
{
id: 2,
name: 'Producto 2',
price: 2000
}
]
export const getAllProducts = (req, res) => {
    const products = productsService.getAllProducts();
    res.json(products);
};

export const getProductById = async (req, res) => {
const id = req.params.id;
const product = productsService.getProductById(id);
if (product) {
res.status(200).json(product);
} else {
res.status(404).json({ message: 'Producto no encontrado' });
}
};

export const createProduct = async (req, res) => {
const { name, price } = req.body;
const newProduct = productsService.createProduct({ name, price });
res.status(201).json(newProduct);
}


export const updateProduct = async (req, res) => {
const id = req.params.id;
const { name, price } = req.body;
const productIndex = productsService.updateProduct(id, { name, price });
if (productIndex !== -1) {
products[productIndex].name = name ?? products[productIndex].name;
products[productIndex].price = price ?? products[productIndex].price;
res.status(200).json(products[productIndex]);
} else {
res.status(404).json({ message: 'Producto no encontrado' });
}
};

export const deleteProduct = async (req, res) => {
const id = req.params.id;
const productIndex = productsService.deleteProduct(id);
if (productIndex !== -1) {
res.status(200).json({ message: 'Producto eliminado' });
} else {
res.status(404).json({ message: 'Producto no encontrado' });
}
};