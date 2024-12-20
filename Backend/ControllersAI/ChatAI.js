import OpenAI from 'openai';
import axios from 'axios';
import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

async function llamartest(idUser){
    try {
        const number = await Prisma.informacionUsuario.findUnique({
            where: {
                idUsuario: idUser,
            },
            select:{
                telefonoPersonal:true
            }
        });

        console.log(number);

        await axios.post(`http://localhost:4000/v1/messages`, {
            "number": number.telefonoPersonal,
            "message":"Bienvenido al cuestionario GHQ-12. Se trata de un instrumento que busca conocer el estado de bienestar psicológico actual, compuesto por 12 preguntas con cuatro opciones de respuesta. Consideramos importante resaltar que la realización de esta actividad no se configura en un diagnóstico psicológico. Agradecemos su tiempo y disposición para participar, teniendo en cuenta que los datos recolectados ayudarán a orientar acciones para el bienestar de muchas personas."
        });

        await axios.post(`http://localhost:4000/v1/messages`, {
            "number": number.telefonoPersonal,
            "message":"Escribe comenzar para proceder"
        });

        return { success: true, message: "Test enviado correctamente - Dale un mensaje parecido a: Gracias por aceptar realizar el test. Te lo enviaré por WhatsApp para garantizar tu confidencialidad y comodidad. 🤗" };

    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: 'Error al enviar el test' };
    }
}

const tools = [{
    "type": "function",
    function: {
        name: 'llamartest', 
        description: 'SOLO SI EL USUARIO: 1.ACEPTA REALIZAR EL TEST 2.muestra indicios de estrés, ansiedad, depresión, o ideacion suicida : preséntale este test de bienestar emocional como una herramienta para apoyarlo.',
        parameters: {
            type: 'object', 
            properties: {
                idUser: { type: 'string', description: 'id del usuario' },   
            },
        }
    }
}];

export const ChatAI = async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY; 
    const { enviarhistorial, idUser } = req.body;
    const openai = new OpenAI({
        apiKey: apiKey,
    });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',  
            messages: enviarhistorial, 
            tools: tools
        });

        const assistantMessage = response.choices[0].message.content;
        const toolCalls = response.choices[0].message.tool_calls;
        console.log('Respuesta de OpenAI:', toolCalls);

        if (toolCalls && toolCalls.length > 0) {
            for (const call of toolCalls) {
                if (call.type === 'function' && call.function.name === 'llamartest') {
                    const args = JSON.parse(call.function.arguments);
                    const result = await llamartest(idUser);
                    console.log('Resultado:', result);
                    const followUpResponse = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [
                            ...enviarhistorial,
                            { role: 'system', content: result.message }
                        ]
                    });
                    const followUpMessage = followUpResponse.choices[0].message.content;
                    res.json({ message: followUpMessage });
                    return;
                }
            }
        } else {
            res.json({ message: assistantMessage });
        }
    } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
};
