import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.VITE_OPENAI_API_KEY;

interface Task {
    title: string;
}

interface TaskCollection {
    [key: string]: Task[];
}

export async function summarizeTasks(taskCollection: TaskCollection, tasks: string[]): Promise<string> {
    try {
        const inProgressTasks = taskCollection['In Progress'].map((task: Task) => task.title).join(', ');
        const blockedTasks = taskCollection['Blocked'].map((task: Task) => task.title).join(', ');
        const completedTasks = taskCollection['Completed'].map((task: Task) => task.title).join(', ');
        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `Fournissez un état des tâches. En cours: ${inProgressTasks}. Bloquées: ${blockedTasks}. Terminées: ${completedTasks}.` }
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
        return 'Une erreur est survenue lors de la récupération du résumé.';
    }
}