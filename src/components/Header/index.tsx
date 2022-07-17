import { PlusCircle } from 'phosphor-react';
import React, { FormEvent, useCallback, useState } from 'react';
import { Todo } from '../../App';
import logoImg from '../../assets/logo.svg';

import styles from './Header.module.css';

interface HeaderProps {
  onCreateTodo: (newTodo: Todo) => void;
}

export const Header = ({ onCreateTodo }: HeaderProps) => {
  const [todoText, setTodoText] = useState('');

  const handleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      onCreateTodo({
        id: Math.random(),
        content: todoText,
        isConcluded: false,
      });

      setTodoText('');
    },
    [todoText, onCreateTodo]
  );

  return (
    <div className={styles.container}>
      <img src={logoImg} alt="Logo do site" />

      <form className={styles.searchForm} onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={todoText}
          placeholder="Adicione uma nova tarefa"
          onChange={e => setTodoText(e.target.value)}
        />
        <button type="submit" disabled={todoText === ''}>
          Criar
          <PlusCircle size={20} />
        </button>
      </form>
    </div>
  );
};
