import React, { useState, useEffect } from 'react';
import { Button, Textarea, Box, Flex } from "@chakra-ui/react";
import { summarizeTasks } from './summarizeTasks';
import useTaskCollection from '../hooks/useTaskCollection';

const SummarizeButton = () => {
    // Récupérer le tableau de tâches depuis le contexte
    const [taskCollection] = useTaskCollection();

    // Combiner toutes les tâches de différentes colonnes en un seul tableau
    const tasks = Object.values(taskCollection).flat();

    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingDots, setLoadingDots] = useState('');

    // Fonction pour ajouter des emojis au résumé
    const addEmojis = (text: string) => {
        // Utiliser des emojis personnalisés ou prédéfinis selon vos besoins
        const emojis = [
            '👍',
            '👌',
            '👏',
        ];

        // Ajouter un emoji aléatoire au texte
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        return `${text} ${randomEmoji}`;
    };

    const handleClick = async () => {
        setIsLoading(true);
        const result = await summarizeTasks(taskCollection, tasks.map(task => task.title));
        // Ajouter des emojis au résumé avant de le définir dans l'état
        const resultWithEmojis = addEmojis(result);

        // Créer un effet de frappe en ajoutant chaque caractère avec un délai
        for (let i = 0; i < resultWithEmojis.length; i++) {
            setTimeout(() => {
                setSummary(prevSummary => prevSummary + resultWithEmojis.charAt(i));
            }, 25 * i); // Vous pouvez ajuster le délai en modifiant la valeur multipliée par i
        }
        setIsLoading(false);
    };

    const handleClear = () => {
        setSummary(''); // Effacer le contenu de l'état summary
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
            }, 300);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <Box textAlign="center">
            <Flex justifyContent="center" mb={4}>
                <Button mr={2} onClick={handleClick}>Résumer les tâches</Button>
                {/* Afficher le bouton "Effacer le résumé" uniquement si le résumé est affiché */}
                {summary && <Button onClick={handleClear}>Effacer le résumé</Button>}
            </Flex>
            <Textarea
                value={isLoading ? `Chargement${loadingDots}` : summary}
                placeholder="Le résumé apparaîtra ici..."
                isReadOnly
                borderColor="transparent"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="justify"
                fontSize="xl"
                fontWeight="bold"
                mt={5}
                textTransform={summary ? 'uppercase' : 'none'}
            />
        </Box>
    );
};

export default SummarizeButton;
