import { generateToken } from "../../utils/token-generator.js";

// Usuarios de ejemplo para validar el login (en producción vendrían de la base de datos)
const users = [
    {
        id: 1,
        email: "user@email.com",
        password: "strongPass123"
    }
];

export const loginService = async ({ email, password }) => {
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
        return null;
    }

    return generateToken({ id: user.id, email: user.email });
};
