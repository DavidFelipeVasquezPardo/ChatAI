import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ConsultaUser = async (req, res) => {
    const { correo, documento } = req.query;

    if (!correo && !documento) {
        return res.status(400).json({ message: 'Falta el parámetro de búsqueda' });
    }

    try {
        const user = await prisma.informacionUsuario.findFirst({
            where: {
                OR: [
                    correo ? { correo: correo } : undefined,
                    documento ? { documento: documento } : undefined,
                ].filter(Boolean),
            },
            include: {
                informacionPersonal: true,
                condicionesVivienda: true,
                educacion: true,
                situacionlaboral: true,
                salud: true,
                chats: true,
                citas: true,
                historialAgendamiento: true,
                ghq12: true,
                tests: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({
            message: 'Datos del usuario consultados correctamente',
            user,
        });

    } catch (error) {
        console.error('Error al consultar los datos: ', error);
        return res.status(500).json({
            error: 'Error al consultar los datos',
            details: error.message,
        });
    }
};