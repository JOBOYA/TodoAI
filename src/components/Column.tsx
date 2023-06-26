import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import useColumnDrop from '../hooks/useColumnDrop';
import useColumnTasks from '../hooks/useColumnTasks';
import { ColumnType } from '../utils/enums';
import Task from './Task';

const ColumnLabels: Record<ColumnType, string> = {
  [ColumnType.TO_DO]: 'À faire',
  [ColumnType.IN_PROGRESS]: 'En cours',
  [ColumnType.BLOCKED]: 'Bloqué',
  [ColumnType.COMPLETED]: 'Terminé',
};

const ColumnColorScheme: Record<ColumnType, string> = {
  [ColumnType.TO_DO]: 'gray',
  [ColumnType.IN_PROGRESS]: 'blue',
  [ColumnType.BLOCKED]: 'red',
  [ColumnType.COMPLETED]: 'green',
};

function Column({ column }: { column: ColumnType }) {
  const { getFilteredTasks } = useColumnTasks(column);
  const [searchText, setSearchText] = useState('');

  const displayedTasks = getFilteredTasks(searchText);
  const {
    tasks,
    addEmptyTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
    updateTask,
  } = useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onUpdate={updateTask}
      onDelete={deleteTask}
    />
  ));

  return (
    <Box justifyContent="space-between" flexWrap="wrap">
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {ColumnLabels[column]}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('green.100', 'gray.600') }}
        py={2}
        variant="solid"
        onClick={addEmptyTask}
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
      />
      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
        background={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)')}
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;
