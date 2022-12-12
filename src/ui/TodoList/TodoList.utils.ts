import crypto from 'crypto';
import { useEffect, useState } from 'react';

export const initialItem = {
  id: '',
  value: '',
  checked: false,
};

export const generateId = () => crypto.randomBytes(4).toString('hex');

export const getInitialState = () => ({
  '1': {
    id: '1',
    value: 'Have a coffee',
    checked: true,
  },
  '2': {
    id: '2',
    value: 'Finish a ticket',
    checked: false,
  },
  '3': {
    id: '3',
    value: 'Do the groceries',
    checked: false,
  },
});

export const todoListStartElementId = 'todo-start';
export const todoListEndElementId = 'todo-end';
export const useTodoListHeight = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      const start = document
        .getElementById(todoListStartElementId)
        ?.getBoundingClientRect();
      const pageEnd = document
        .getElementById(todoListEndElementId)
        ?.getBoundingClientRect();

      const height =
        (start?.height || 0) + (start?.y || 0) - (pageEnd?.height || 0);
      setHeight(height);
    }, 150);
  }, []);

  return height;
};
