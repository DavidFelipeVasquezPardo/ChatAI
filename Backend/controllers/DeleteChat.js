import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const DeleteChat = async (req, res) => {

    const { chatId } = req.body;

    try {
        await prisma.chats.delete({
            where: {
                idchat: chatId,
            },
        });
        res.status(200).send({ message: "Chat deleted successfully", idchat: chatId });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete chat" });
    }
    
}