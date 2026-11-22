import express from 'express';
import cors from 'cors';
import productsRouter from './src/routes/products.routes.js';

const app = express();

// Registrar rutas en Express 
app.use('/api', productsRouter);

// Configuración básica: Permitir todos los orígenes
app.use(cors());
// Configuración avanzada: Permitir dominios específicos
const corsOptions = {
// Dominios permitidos
origin: ['https://example.com', 'https://anotherdomain.com'],

// Métodos HTTP permitidos
methods: ['GET', 'POST', 'PUT', 'DELETE'],

// Encabezados permitidos
allowedHeaders: ['Content-Type', 'Authorization'],
credentials: true // Permitir cookies y credenciales
};
app.use(cors(corsOptions));

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API de productos');
});


// Ruta para obtener un item por ID
app.get('/item/:id', (req, res) => {
const itemId = req.params.id;

// Buscar en la base de datos
res.json({ message: `Has solicitado el item con ID: ${itemId}` });
});






// Middleware para recibir JSON
app.use(express.json());

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Middleware para manejar errores 404
app.use((req, res, next) => {
res.status(404).send('Recurso no encontrado o ruta inválida');
});