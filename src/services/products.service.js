//Los servicios actúan como una capa intermedia entre los controladores y los modelos. Su objetivo es manejar la lógica de negocio y orquestar las operaciones necesarias para cumplir con los requisitos de la aplicación. Los servicios pueden enriquecer o transformar los datos antes de pasarlos al controlador. Por ejemplo, podrían combinar datos de múltiples modelos, aplicar reglas de negocio o validaciones adicionales.

import {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../models/products.model.js";

export const getAllProductsService = async (category) => {
    if (category) {
        return await getProductsByCategory(category);
    }
    return await getAllProducts();
};

export const getProductServiceById = async (id) => {
    return await getProductById(id);
};

export const createProductService = async (product) => {
    return await createProduct(product);
};

export const updatedProductService = async (id, updatedData) => {
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
        return null;
    }
    return await updateProduct(id, updatedData);
};

export const deleteProductService = async (id) => {
    return await deleteProduct(id);
};
