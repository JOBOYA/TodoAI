// summarizeTasks.js
import axios from 'axios';



const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY =  'YOUR_API_KEY_HERE'

export async function summarizeTasks(tasks: string[]) {
    try {
        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `Résumez les tâches suivantes: ${tasks.join(', ')}` }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        console.log(response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
    }
}

