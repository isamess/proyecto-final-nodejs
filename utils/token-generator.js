import "dotenv/config";
import jwt from "jsonwebtoken";


const secret_key = process.env.JWT_SECRET_KEY; // Clave secreta para firmar los tokens JWT

// Si no está configurada, fallamos al arrancar en vez de firmar con una clave conocida.
if (!secret_key) {
    throw new Error("Falta la variable de entorno JWT_SECRET_KEY");
}


export const generateToken =(userData) => {
    const user = {
        id: userData.id,
        email: userData.email
           };
           const expiration ={ expiresIn: "1h" 
           };
    return jwt.sign(user, secret_key, expiration);  
           };
