import React, { useState, useEffect } from 'react';
import { Button, Textarea, Box, Flex } from "@chakra-ui/react";
import { summarizeTasks } from './summarizeTasks';
import useTaskCollection from '../hooks/useTaskCollection';
import useColumnTasks from '../hooks/useColumnTasks';

const SummarizeButton = () => {
    // Récupérer le tableau de tâches depuis le contexte
    const [taskCollection] = useTaskCollection();
   

    // Combiner toutes les tâches de différentes colonnes en un seul tableau
    const tasks = Object.values(taskCollection).flat();
    // Ajouter les tâches de la colonne "En cours" au tableau de tâches
    


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
    borderColor="black"
    display="flex"
    justifyContent="center"
    alignItems="center"
    textAlign="justify"
    fontSize="xl"
    width={{ base: '90%', md: '600px' }} // 90% de la largeur de l'écran sur les petits écrans, 600px sur les écrans moyens et plus grands
    height={{ base: '200px', md: '400px' }} // 200px de hauteur sur les petits écrans, 400px sur les écrans moyens et plus grands
    mt={5}
    mx="auto" // Centrer horizontalement
/>

        </Box>
    );
};

export default SummarizeButton;
