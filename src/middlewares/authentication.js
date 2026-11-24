import jwt from "jsonwebtoken";
import "dotenv/config";

const secret_key = process.env.JWT_SECRET_KEY; // Clave secreta para verificar los tokens JWT

// Si no está configurada, fallamos al arrancar en vez de firmar con una clave conocida.
if (!secret_key) {
    throw new Error("Falta la variable de entorno JWT_SECRET_KEY");
}


//Middleware para verificar el token JWT en las solicitudes entrantes

export const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }
    
    jwt.verify(token, secret_key, (err) => {
        if (err) { return res.status(403).json({ message: "Token inválido" }); }
        next(); 

    });
}
    