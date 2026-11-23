import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRoutes from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();

// Configuración básica: Permitir todos los orígenes
app.use(cors({
    origin: '*'
}));

// Middleware global para interpretar los body en formato JSON
app.use(bodyParser.json());

// Log de peticiones recibidas
app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
});

// Routers
app.use('/api', productsRoutes);
app.use('/auth', authRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API de productos');
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        error: "404 ruta no encontrada",
        message: `El recurso ${req.url} no existe`
    });
});

// Middleware para manejar errores (500)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor'
    });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
