import * as productService from "../models/products.model.js";


//Los servicios actúan como una capa intermedia entre los controladores y los modelos. Su objetivo es manejar la lógica de negocio y orquestar las operaciones necesarias para cumplir con los requisitos de la aplicación. Los servicios pueden enriquecer o transformar los datos antes de pasarlos al controlador. Por ejemplo, podrían combinar datos de múltiples modelos, aplicar reglas de negocio o validaciones adicionales.


export const getAllProducts =  () => {
return productService.getAllProducts();
};
export const getProductById = async (id) => {
return productService.getProductById(id);
};

export const createProduct = async (productData) => {
const {name, price} = productData;
return productService.saveProduct(name, price);
};

export const updateProduct = async (id, productData) => {
const { name, price } = productData;
return productService.updateProduct(id, { name, price });
};

export const deleteProduct = async (id) => {
return productService.deleteProduct(id);
};
