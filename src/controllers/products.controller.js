import { getAllProductsService, getProductServiceById, createProductService, updatedProductService, deleteProductService } from "../services/products.service.js";

const CAMPOS_PRODUCTO = ["nombre", "descripcion", "categoria", "precio"];

// Devuelve un mensaje de error o null cuando el producto es válido.
// Con parcial = true se permite actualizar solo algunos campos (por ejemplo, precio).
const validarProducto = (producto, parcial = false) => {
    if (!producto || typeof producto !== "object" || Array.isArray(producto)) {
        return "Datos del producto no proporcionados";
    }

    const presentes = CAMPOS_PRODUCTO.filter((campo) =>
        Object.prototype.hasOwnProperty.call(producto, campo)
    );

    if (presentes.length === 0) {
        return "Datos del producto no proporcionados";
    }

    if (!parcial && (!producto.nombre || producto.precio === undefined)) {
        return "nombre y precio son obligatorios";
    }

    for (const campo of presentes) {
        const valor = producto[campo];
        if (campo === "precio") {
            if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0) {
                return "precio debe ser un número mayor o igual a 0";
            }
        } else if (typeof valor !== "string" || valor.trim() === "") {
            return `${campo} debe ser un texto no vacío`;
        }
    }

    return null;
};

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
    const error = validarProducto(product);
    if (error) {
        return res.status(400).send({ message: error });
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
    const error = validarProducto(productData, true);
    if (error) {
        return res.status(400).send({ message: error });
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
