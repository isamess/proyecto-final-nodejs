import fs from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;
// Ruta al archivo JSON que simula la "base de datos"
const dataPath = path.join(__dirname, '../data/productos.json');

//Los modelos se encargan de interactuar directamente con los datos. En este caso, el modelo Product maneja la lectura y escritura del archivo JSON, simulando el acceso a una base de datos. Su objetivo es abstraer la lógica de acceso a los datos, proporcionando métodos. Los modelos no deben contener lógica de negocio; su función es simplemente gestionar los datos.



// Método para buscar un producto por su ID
export function getProductById(id) {
const products = this.getAllProducts();
return products.find(product => product.id === id);
};
// Método para obtener todos los productos
export function getAllProducts() {
const data = fs.readFileSync(dataPath, 'utf-8');
return JSON.parse(data);
};
// Método para guardar un producto en el archivo JSON
export function saveProduct(name, price) {
const products = this.getAllProducts();
products.push({ id: products.length, name, price });
fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};
// Método para eliminar un producto por su ID
export function deleteProduct(id) {
const products = this.getAllProducts();
products = products.filter(product => product.id !== id);
fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};
