import  OpenAI  from 'openai';

export const ChatAI = async (req, res) => {

    const apiKey = process.env.OPENAI_API_KEY;

    const { enviarhistorial } = req.body;

    const openai = new OpenAI({
        apiKey: apiKey,
    });

    try {
        
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.1,
            max_tokens: 50,
            messages: enviarhistorial,
        });

        const assistantMessage = response.choices[0].message.content;

        res.json({ message: assistantMessage });

    } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
};
