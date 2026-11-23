import "dotenv/config";
import jwt from "jsonwebtoken";


const secret_key = process.env.JWT_SECRET_KEY || "default_secret_key"; // Clave secreta para firmar y verificar los tokens JWT


export const generateToken =(userData) => {
    const user = {
        id: userData.id,
        email: userData.email
           };
           const expiration ={ expiresIn: "1h" 
           };
    return jwt.sign(user, secret_key, expiration);  
           };
