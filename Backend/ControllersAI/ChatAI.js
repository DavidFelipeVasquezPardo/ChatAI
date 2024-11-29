import  OpenAI  from 'openai';

export const ChatAI = async (req, res) => {

    const apiKey = process.env.OPENAI_API_KEY;

    const { newMessage } = req.body;

    const openai = new OpenAI({
        apiKey: apiKey,
    });

    let conversation = [
        { role: 'system', content: 'Eres un asistente útil' },
    ];

    conversation.push({role: 'user', content: newMessage});

    try {
        
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.1,
            max_tokens: 5,
            messages: conversation,
        });

        const assistantMessage = response.choices[0].message.content;

        conversation.push({ role: 'assistant', content: assistantMessage });

        res.json({ message: assistantMessage });

    } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
};
