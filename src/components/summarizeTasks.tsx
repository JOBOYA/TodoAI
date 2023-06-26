import axios from 'axios';
import { ColumnType } from '../utils/enums';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface Task {
    title: string;
}

interface TaskCollection {
    [key: string]: Task[];
}

export async function summarizeTasks(taskCollection: TaskCollection, _tasks: string[]): Promise<string> {
    try {
       
        const todoTasks = taskCollection[ColumnType.TO_DO].map((task: Task) => task.title).join(', ');
        const inProgressTasks = taskCollection[ColumnType.IN_PROGRESS].map((task: Task) => task.title).join(', ');
        const blockedTasks = taskCollection[ColumnType.BLOCKED].map((task: Task) => task.title).join(', ');
        const completedTasks = taskCollection[ColumnType.COMPLETED].map((task: Task) => task.title).join(', ');

        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `Fourni moi un résumé de mes tâches. ajoute des emojis devant chaque résumé. A faire: ${todoTasks}. En cours: ${inProgressTasks}. Bloqué: ${blockedTasks}. Terminé:  ${completedTasks}.` }


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
