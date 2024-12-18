import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const AllChats = async (req, res) => {

    const { idUsuario } = req.body;

    if(!idUsuario){
        return res.status(400).json({ message: 'Faltan datos requeridos' });  
    }

    try{
        const Allchats = await prisma.chats.findMany({
            where:{
                idUsuario: idUsuario
            },
            select:{
                idchat: true,
                fechaHora: true,
                conversacion: false
            },
        })

        return res.status(201).json({Allchats});
        // console.log(Allchats)
    }

    catch(error){
        console.error("Error en la busqueda de chats:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
