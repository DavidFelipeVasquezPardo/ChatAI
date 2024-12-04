import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Chat = async (req, res) => {
    const { idchat, idUsuario, conversacion } = req.body;

    console.log("Datos recibidos:", req.body);

    if (!conversacion || !idUsuario) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    if (!idchat) {
        try {
            const chats = await prisma.chats.create({
                data: {
                    idUsuario, 
                    conversacion
                },
                select: {
                    idchat: true,
                    idUsuario: true,
                    fechaHora: true,
                    conversacion: true,
                },
            });

            console.log("Chat creado:", chats);

            return res.status(201).json({ message: 'Chat creado exitosamente', chat: chats });
        } catch (error) {
            console.error("Error en la creación del chat:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    } else {
        try {
            const chatupdate = await prisma.chats.update({
                where: { idchat },
                data: { conversacion },
            });

            return res.status(200).json({ message: 'Chat actualizado exitosamente', chat: chatupdate });
        } catch (error) {
            console.error("Error al actualizar el chat:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};
