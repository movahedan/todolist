import { useEffect, useRef, useState } from 'react';

import { generateId } from './TodoList.utils';

import type { TodoItemType } from './TodoList.types';
import type { CSSProperties, FormEventHandler } from 'react';

type TodoInputProps = {
  currentItem: TodoItemType;
  onSubmit: (item: TodoItemType) => void;
  style?: CSSProperties;
  className?: string;
};

export const TodoInput = ({
  currentItem,
  onSubmit,
  style,
  className,
}: TodoInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(currentItem.value);

  useEffect(() => {
    if (inputRef.current) {
      setValue(currentItem.value || '');
      inputRef.current.focus();
    }
  }, [currentItem]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const id = currentItem.id || generateId();
    if (value) {
      onSubmit({ id, value, checked: currentItem.checked });
    }

    if (inputRef.current) {
      setValue('');
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={style}
      className={['inline-flex w-full px-3', className || ''].join(' ')}
    >
      <input
        ref={inputRef}
        type='text'
        name='todo'
        placeholder='Todo name'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='flex-1 align-middle p-1.5'
      />

      <button
        type='submit'
        className={['align-middle w-9 h-9', value ? 'text-teal-500' : ''].join(
          ' '
        )}
      >
        {currentItem.id ? (
          <svg fill='currentColor' viewBox='0 0 40 40'>
            <path d='M15.792 30.083q-.417 0-.834-.166-.416-.167-.666-.5L6.833 22q-.625-.625-.625-1.583 0-.959.625-1.584.667-.625 1.605-.625.937 0 1.604.625l5.75 5.834 14.166-14.209q.667-.625 1.604-.645.938-.021 1.563.645.667.667.667 1.625 0 .959-.667 1.584l-15.792 15.75q-.291.333-.687.5-.396.166-.854.166Z' />
          </svg>
        ) : (
          <svg fill='currentColor' viewBox='0 0 40 40'>
            <path d='M20 32.458q-.917 0-1.562-.604-.646-.604-.646-1.604v-8.042H9.708q-.875 0-1.541-.646Q7.5 20.917 7.5 20q0-.958.667-1.583.666-.625 1.541-.625h8.084V9.708q0-.958.666-1.583Q19.125 7.5 20 7.5q.917 0 1.562.625.646.625.646 1.583v8.084h8.084q.916 0 1.562.625T32.5 20q0 .917-.646 1.562-.646.646-1.562.646h-8.084v8.042q0 1-.646 1.604-.645.604-1.562.604Z' />
          </svg>
        )}
      </button>
    </form>
  );
};
