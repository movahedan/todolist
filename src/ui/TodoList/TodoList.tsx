import { useMemo, useState } from 'react';

import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import {
  initialItem,
  todoListStartElementId,
  useTodoListHeight,
  getInitialState,
} from './TodoList.utils';

import type { TodoItemType } from './TodoList.types';
import type { CSSProperties } from 'react';

type TodoProps = {
  style?: CSSProperties;
  className?: string;
};

export const TodoList = ({ style, className }: TodoProps) => {
  const height = useTodoListHeight();
  const [todoMap, setTodoMap] =
    useState<Record<string, TodoItemType>>(getInitialState);
  const todoList = useMemo(() => Object.values(todoMap).reverse(), [todoMap]);
  const [currentItem, setCurrentItem] = useState<TodoItemType>(
    () => initialItem
  );

  const onSubmit = (item: TodoItemType) => {
    setCurrentItem(initialItem);
    setTodoMap((todoMap) => ({
      ...todoMap,
      [item.id]: item,
    }));
  };

  const onToggle = (item: TodoItemType) =>
    setTodoMap((todoMap) => ({
      ...todoMap,
      [item.id]: { ...item, checked: !todoMap[item.id].checked },
    }));

  const onDelete = (item: TodoItemType) =>
    setTodoMap((todoMap) => {
      delete todoMap[item.id];

      return { ...todoMap };
    });

  return (
    <div
      style={style}
      className={[
        'flex flex-1 flex-col w-full overflow-hidden',
        className || '',
      ].join(' ')}
    >
      <TodoInput
        currentItem={currentItem}
        onSubmit={onSubmit}
        className='mt-1'
      />

      <span id={todoListStartElementId} />

      {!todoList.length ? null : (
        <ul
          className='flex-1 px-3 mt-2 overflow-y-auto space-y-3'
          style={{ maxHeight: `calc(100vh - ${height})` }}
        >
          {todoList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              active={currentItem.id === item.id}
              onEdit={() => setCurrentItem(item)}
              onToggle={() => onToggle(item)}
              onDelete={() => onDelete(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
