import React, { useCallback, useMemo, useState } from 'react';
import { Notepad } from 'phosphor-react';

import './global.css';
import styles from './App.module.css';

import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';

export interface Todo {
  id: number;
  content: string;
  isConcluded: boolean;
}

const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const todoListConcluedLength = useMemo(() => {
    return todoList.filter(todo => todo.isConcluded).length;
  }, [todoList]);

  const handleCreateNewTodo = useCallback(
    (newTodo: Todo) => {
      const isAlreadyExists = todoList.find(
        todo => todo.content === newTodo.content
      );

      if (isAlreadyExists) {
        return alert('Tarefa já criada');
      }

      setTodoList([...todoList, newTodo]);
    },
    [todoList]
  );

  const handleDeleteTodo = useCallback(
    (id: number) => {
      const todoListWithoutDeletedOne = todoList.filter(todo => todo.id !== id);

      setTodoList(todoListWithoutDeletedOne);
    },
    [todoList]
  );

  const handleChangeStatus = useCallback(
    (id: number) => {
      const todo = todoList.find(todo => todo.id === id);

      if (!todo) {
        return;
      }

      const updateTodoList = todoList.map(item => {
        if (item.id == todo.id) {
          return {
            ...item,
            isConcluded: !item.isConcluded,
          };
        }

        return item;
      });

      setTodoList(updateTodoList);
    },
    [todoList]
  );

  return (
    <>
      <Header onCreateTodo={handleCreateNewTodo} />

      <div className={styles.wrapper}>
        <div className={styles.todoListHeader}>
          <div>
            <p>Tarefas criadas</p>
            <span>{todoList.length}</span>
          </div>

          <div>
            <p>Concluídas</p>
            <span>
              {todoList.length === 0
                ? '0'
                : `${todoListConcluedLength} de ${todoList.length}`}
            </span>
          </div>
        </div>

        {todoList.length > 0 ? (
          <div className={styles.todoListContent}>
            {todoList.map(todo => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onDeleteTodo={handleDeleteTodo}
                onChangeValue={handleChangeStatus}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyTodoList}>
            <Notepad size={56} />
            <b>Você ainda não tem tarefas cadastradas</b>
            <span>Crie tarefas e organize seus itens à fazer</span>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
