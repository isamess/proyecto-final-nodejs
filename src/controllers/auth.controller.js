import { loginService } from "../services/auth.service.js";

export async function login(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            message: "Email y contraseña son obligatorios"
        });
    }

    try {
        const token = await loginService({ email, password });

        if (!token) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno al iniciar sesión" });
    }
};
