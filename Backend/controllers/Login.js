import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const Login = async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {   
        const credenciales = await prisma.credencial.findMany({
            where: {
                usuario: usuario,
            }
        });

        if (credenciales.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let credencialValida = null;
        for (const credencial of credenciales) {
            const isPasswordValid = await bcrypt.compare(contrasena, credencial.contrasena);
            if (isPasswordValid) {
                credencialValida = credencial;
                break;
            }
        }

        if (!credencialValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const { contrasena: _, ...userWithoutPassword } = credencialValida;
        res.json({ message: "Inicio de sesión exitoso", usuario: userWithoutPassword });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
