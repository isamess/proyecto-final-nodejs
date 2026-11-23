import { getAllProductsService, getProductServiceById, createProductService, updatedProductService, deleteProductService } from "../services/products.service.js";


export const getAllProducts = async (req, res) => {
    const category = req.query.category;
    try {
        const products = await getAllProductsService(category);
        res.status(200).send({
            status: 'success',
            data: products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al obtener los productos'
        });
    }
};

export const getProductById = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const product = await getProductServiceById(id);
            if (product) {
                res.send({
                    message: 'Producto encontrado',
                    data: product
                });
            } else {
                res.status(404).send({
                    message: 'Producto no encontrado'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error al obtener el producto'
            });
        }
    } else {
        res.status(400).send({
            message: 'ID de producto no proporcionado'
        });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product || Object.keys(product).length === 0) {
        return res.status(400).send({
            message: 'Datos del producto no proporcionados'
        });
    }
    try {
        const newProduct = await createProductService(product);
        res.status(201).send({
            message: 'Producto creado exitosamente',
            data: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error interno al crear el producto'
        });
    }
};

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({
            message: 'ID de producto no proporcionado'
        });
    }

    const productData = req.body;
    if (!productData || Object.keys(productData).length === 0) {
        return res.status(400).send({
            message: 'Datos del producto no proporcionados'
        });
    }

    try {
        const updatedProduct = await updatedProductService(id, productData);
        if (updatedProduct) {
            res.send({
                message: 'Producto actualizado exitosamente',
                data: updatedProduct
            });
        } else {
            res.status(404).send({
                message: 'Producto no encontrado'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error interno al actualizar el producto'
        });
    }
};

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const deletedProduct = await deleteProductService(id);
            if (deletedProduct) {
                res.send({
                    message: 'Producto eliminado exitosamente',
                    data: id
                });
            } else {
                res.status(404).send({
                    message: 'Producto no encontrado'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error interno al eliminar el producto'
            });
        }
    } else {
        res.status(400).send({
            message: 'ID de producto no proporcionado'
        });
    }
};
