import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const CargarChat = async (req, res) => {

    const { idchat } = req.body;

    if(!idchat){
        return res.status(400).json({ message: 'Faltan datos requeridos' });  
    }
    
    try{
        const Cargar = await prisma.chats.findUnique({
            where:{
                idchat: idchat
            },
            select:{
                idchat: false,
                fechaHora: false,
                conversacion: true,
            },
        })
        return res.status(201).json({Cargar});
    }

    catch(error){
        console.error("Error en la busqueda de chats:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }

}