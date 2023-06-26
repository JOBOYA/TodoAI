import React, { useState, useEffect } from 'react';
import { Button, Textarea, Box, Flex } from "@chakra-ui/react";
import { summarizeTasks } from './summarizeTasks';
import useTaskCollection from '../hooks/useTaskCollection';

const SummarizeButton = () => {
    const [taskCollection] = useTaskCollection();
    const tasks = Object.values(taskCollection).flat();

    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingDots, setLoadingDots] = useState('');
    const [isPaused, setIsPaused] = useState(false);
    const [currentTimeouts, setCurrentTimeouts] = useState<NodeJS.Timeout[]>([]);
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = async () => {
        setIsLoading(true);
        const result = await summarizeTasks(taskCollection, tasks.map(task => task.title));
        setCurrentText(result);
        const newTimeouts = createTimeouts(result);
        setCurrentTimeouts(newTimeouts);
        setIsLoading(false);
    };

    const createTimeouts = (text: string) => {
        const timeouts: NodeJS.Timeout[] = [];
        for (let i = 0; i < text.length; i++) {
            const timeout = setTimeout(() => {
                setSummary(prevSummary => prevSummary + text[i]);
                setCurrentIndex(i);
            }, 25 * i);
            timeouts.push(timeout);
        }
        return timeouts;
    };

    const clearTimeouts = () => {
        currentTimeouts.forEach((timeout) => {
            clearTimeout(timeout);
        });
    };

    const resumeTimeouts = () => {
        const newTimeouts = createTimeouts(currentText.slice(currentIndex));
        setCurrentTimeouts(newTimeouts);
    };

    const handleStop = () => {
        setIsPaused(true);
        clearTimeouts();
    };

    const handlePlay = () => {
        setIsPaused(false);
        resumeTimeouts();
    };

    const handleClear = () => {
        setSummary('');
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
            <Flex justifyContent="center" mb={4} direction={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "stretch" }}>
                <Button maxW="200px" mb={{ base: 2, md: 0 }} mr={{ base: 2, md: 2 }} onClick={handleClick}>Résumer les tâches</Button>
                {summary && <Button maxW="200px" mb={{ base: 2, md: 0 }} mr={{ base: 0, md: 2 }} onClick={handleClear}>Effacer le résumé</Button>}
                {summary && (
                    isPaused ?
                        <Button maxW="200px" onClick={handlePlay}>
                            {/* Play Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 -2 16 20">
                                <path fillRule="evenodd" d="M6 0l6 8-6 8V0z" />
                            </svg>
                        </Button>
                        :
                        <Button maxW="200px" onClick={handleStop}>
                            {/* Pause Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 -2 16 20">
                                <path fillRule="evenodd" d="M0 0h6v16H0V0zm10 0h6v16h-6V0z" />
                            </svg>
                        </Button>
                )}
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
                width={{ base: '90%', md: '600px' }} 
                height={{ base: '200px', md: '300px' }} 
                mt={5}
                mx="auto" 
            />
        </Box>
    );
                }    

export default SummarizeButton;
