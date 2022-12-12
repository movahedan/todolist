export type TodoItemType = {
  id: string;
  value: string;
  checked: boolean;
};

export type FilterType = Record<'checked' | 'deleted', boolean>;
