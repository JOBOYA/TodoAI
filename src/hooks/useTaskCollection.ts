import { useLocalStorage } from 'usehooks-ts';

import { v4 as uuidv4 } from 'uuid';
import { ColumnType} from '../utils/enums';
import { TaskModel } from '../utils/models';

function useTaskCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    [ColumnType.TO_DO]: [
      {
        id: uuidv4(),
        column: ColumnType.TO_DO,
        title: 'Tâche 1',
        color: 'blue.300',
      },
    ],
    [ColumnType.IN_PROGRESS]: [
      {
        id: uuidv4(),
        column: ColumnType.IN_PROGRESS,
        title: 'Tâche 2',
        color: 'yellow.300',
      },
    ],
    [ColumnType.BLOCKED]: [
      {
        id: uuidv4(),
        column: ColumnType.BLOCKED,
        title: 'Tâche 3',
        color: 'red.300',
      },
    ],
    [ColumnType.COMPLETED]: [
      {
        id: uuidv4(),
        column: ColumnType.COMPLETED,
        title: 'Tâche 4',
        color: 'green.300',
      },
    ],
  });
}


export default useTaskCollection;
