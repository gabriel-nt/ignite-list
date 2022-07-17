import { Trash } from 'phosphor-react';
import { Todo } from '../../App';

import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onDeleteTodo: (id: number) => void;
  onChangeValue: (id: number) => void;
}

export const TodoItem = ({
  todo,
  onDeleteTodo,
  onChangeValue,
}: TodoItemProps) => {
  return (
    <label className={styles.todoItem}>
      <input type="checkbox" onChange={e => onChangeValue(todo.id)} />
      <span>{todo.content}</span>
      <Trash
        size={20}
        className={styles.trashIcon}
        onClick={() => onDeleteTodo(todo.id)}
      />
    </label>
  );
};
