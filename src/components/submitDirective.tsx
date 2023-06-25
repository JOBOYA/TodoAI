import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface Task {
    title: string;
}

interface TaskCollection {
    [key: string]: Task[];
}



export async function submitDirective(directive: string): Promise<string> {
    try {
        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: directive }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return 'Une erreur est survenue lors de la soumission de la directive.';
    }
}
