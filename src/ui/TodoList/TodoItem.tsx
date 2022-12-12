import { useState } from 'react';

import type { TodoItemType } from './TodoList.types';
import type { CSSProperties, PropsWithChildren } from 'react';

type TodoItemProps = {
  item: TodoItemType;
  active?: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
  style?: CSSProperties;
  className?: string;
};

export const TodoItem = ({
  item,
  active,
  onToggle,
  onDelete,
  onEdit,
  style,
  className,
}: TodoItemProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const onDeleteButtonClicked = () => setIsConfirming(true);
  const onCancelConfirmClicked = () => setIsConfirming(false);
  const onDeleteConfirmClicked = () => {
    setIsConfirming(false);
    onDelete();
  };

  const itemSummary = item.value.slice(0, 10);

  return (
    <li
      key={item.id}
      value={item.id}
      style={style}
      className={[
        'flex items-center my-3',
        item.checked
          ? 'bg-gray-300 dark:bg-gray-500'
          : 'bg-gray-200 dark:bg-gray-800',
        active
          ? 'border-2 border-teal-500 border-spacing-1'
          : 'border-2 border-transparent',
        className || '',
      ].join(' ')}
      aria-labelledby={`${item.id}-name`}
    >
      <button
        aria-label={`Make this done: ${itemSummary}`}
        onClick={() => onToggle()}
        className='w-10 h-10 p-2.5'
      >
        <SVG aria-checked={item.checked}>
          {item.checked ? (
            <path d='M8.208 36.208q-1.833 0-3.125-1.291-1.291-1.292-1.291-3.125V8.208q0-1.833 1.291-3.146Q6.375 3.75 8.208 3.75h23.584q1.833 0 3.146 1.312 1.312 1.313 1.312 3.146v23.584q0 1.833-1.312 3.125-1.313 1.291-3.146 1.291Zm0-4.416h23.584V8.208H8.208v23.584Zm9.209-5.084q.416 0 .833-.166.417-.167.708-.5l9.542-9.459q.583-.625.583-1.479 0-.854-.583-1.521Q27.875 13 27 13t-1.5.583l-8.083 8.125-3-3.041q-.584-.625-1.459-.605-.875.021-1.5.646-.583.584-.583 1.48 0 .895.625 1.437l4.417 4.417q.25.333.666.5.417.166.834.166Zm-9.209 5.084V8.208v23.584Z' />
          ) : (
            <path d='M8.208 36.208q-1.833 0-3.125-1.291-1.291-1.292-1.291-3.125V8.208q0-1.833 1.291-3.146Q6.375 3.75 8.208 3.75h23.584q1.833 0 3.146 1.312 1.312 1.313 1.312 3.146v23.584q0 1.833-1.312 3.125-1.313 1.291-3.146 1.291Zm0-4.416h23.584V8.208H8.208v23.584Z' />
          )}
        </SVG>
      </button>

      <p
        id={`${item.id}-name`}
        className='flex-1 overflow-hidden text-ellipsis'
      >
        {item.value}
      </p>

      <div className='flex items-center ml-auto'>
        <button
          aria-label={`Edit this: ${itemSummary}`}
          onClick={() => onEdit()}
          className='w-10 h-10 p-2.5'
        >
          <SVG>
            <path d='M8.083 32.292h1.459L26.25 15.5 24.792 14 8.083 30.792ZM33 13.542l-6.25-6.209 1.792-1.791q.958-.959 2.312-.979 1.354-.021 2.438.979l1.541 1.541q1.084 1.042.979 2.396-.104 1.354-1.062 2.271ZM6.917 35.625q-1 0-1.625-.625t-.625-1.542v-3.125q0-.416.187-.854.188-.437.479-.687l19.5-19.5 6.209 6.166-19.417 19.5q-.333.334-.792.5-.458.167-.833.167Zm18.666-20.833L24.792 14l1.458 1.5Z' />
          </SVG>
        </button>

        {!isConfirming ? (
          <button
            aria-label={`Delete this: ${itemSummary}`}
            onClick={() => onDeleteButtonClicked()}
            className='w-10 h-10 p-2.5'
          >
            <SVG>
              <path d='M10.75 36.208q-1.792 0-3.125-1.291-1.333-1.292-1.333-3.125V9.5H6q-.917 0-1.542-.625t-.625-1.542q0-.958.625-1.604.625-.646 1.542-.646h7.917q0-.916.625-1.562t1.583-.646h7.75q.958 0 1.604.646.646.646.646 1.562H34q.958 0 1.583.667t.625 1.542q0 .958-.625 1.583T34 9.5h-.333v22.292q0 1.833-1.292 3.125-1.292 1.291-3.125 1.291Zm0-26.708v22.292h18.5V9.5Zm3.792 17.417q0 .708.541 1.229.542.521 1.25.521.709 0 1.271-.521.563-.521.563-1.229v-12.5q0-.709-.563-1.271-.562-.563-1.271-.563-.708 0-1.25.563-.541.562-.541 1.271Zm7.333 0q0 .708.563 1.229.562.521 1.27.521.709 0 1.25-.521.542-.521.542-1.229v-12.5q0-.709-.542-1.271-.541-.563-1.291-.563-.709 0-1.25.563-.542.562-.542 1.271ZM10.75 9.5v22.292V9.5Z' />
            </SVG>
          </button>
        ) : (
          <>
            <button
              aria-label={`Cancel`}
              onClick={() => onCancelConfirmClicked()}
              className='w-10 h-10 p-2.5'
            >
              <SVG>
                <path d='m20 23.083-7.958 8q-.667.667-1.563.667-.896 0-1.562-.667-.667-.666-.667-1.562T8.917 28l8-8-8-8q-.625-.625-.625-1.542 0-.916.625-1.541.625-.625 1.541-.625.917 0 1.584.625l7.958 8 8-8.042q.625-.625 1.521-.625.896 0 1.562.625.667.667.667 1.583 0 .917-.667 1.542l-8 7.958 8 8q.667.667.667 1.584 0 .916-.667 1.541-.625.667-1.541.667-.917 0-1.542-.667Z' />
              </SVG>
            </button>
            <button
              aria-label={`Are you sure?`}
              onClick={() => onDeleteConfirmClicked()}
              className='w-10 h-10 text-red-500 p-2.5'
            >
              <SVG>
                <path d='M10.75 36.208q-1.792 0-3.125-1.291-1.333-1.292-1.333-3.125V9.5H6q-.917 0-1.542-.625t-.625-1.542q0-.958.625-1.604.625-.646 1.542-.646h7.917q0-.916.625-1.562t1.583-.646h7.75q.958 0 1.604.646.646.646.646 1.562H34q.958 0 1.583.667t.625 1.542q0 .958-.625 1.583T34 9.5h-.333v22.292q0 1.833-1.292 3.125-1.292 1.291-3.125 1.291Zm0-26.708v22.292h18.5V9.5Zm3.792 17.417q0 .708.541 1.229.542.521 1.25.521.709 0 1.271-.521.563-.521.563-1.229v-12.5q0-.709-.563-1.271-.562-.563-1.271-.563-.708 0-1.25.563-.541.562-.541 1.271Zm7.333 0q0 .708.563 1.229.562.521 1.27.521.709 0 1.25-.521.542-.521.542-1.229v-12.5q0-.709-.542-1.271-.541-.563-1.291-.563-.709 0-1.25.563-.542.562-.542 1.271ZM10.75 9.5v22.292V9.5Z' />
              </SVG>
            </button>
          </>
        )}
      </div>
    </li>
  );
};

const SVG = (props: PropsWithChildren) => (
  <svg fill='currentColor' viewBox='0 0 40 40' {...props} />
);
