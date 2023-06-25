import React, { useState } from 'react';
import { Button, Textarea } from "@chakra-ui/react";
import { summarizeTasks } from './summarizeTasks';

const SummarizeButton = () => {
    const tasks: string[] = ['Tâche 1', 'Tâche 2', 'Tâche 3'];
    const [summary, setSummary] = useState('');

    const handleClick = async () => {
        const result = await summarizeTasks(tasks);
        setSummary(result);
    };

    return (
        <>
        <Button onClick={handleClick}>Résumer les tâches</Button>
        <Textarea value={summary} placeholder="Le résumé apparaîtra ici..." />
        </>
    );

};

export default SummarizeButton;
