import React, { useState } from 'react';
import { Button, Textarea } from "@chakra-ui/react";
import { summarizeTasks } from './summarizeTasks';
import useTaskCollection from '../hooks/useTaskCollection';

const SummarizeButton = () => {
    // Récupérer le tableau de tâches depuis le contexte
    const [taskCollection] = useTaskCollection();

    // Combiner toutes les tâches de différentes colonnes en un seul tableau
    const tasks = Object.values(taskCollection).flat();

    const [summary, setSummary] = useState('');

    const handleClick = async () => {
        const result = await summarizeTasks(taskCollection, tasks.map(task => task.title));
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
