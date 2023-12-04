import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from './types';

interface TodoListProps {
  todos: Todo[];
  toggleDone: (id: string) => void;
  editTodo: (id: string, newName: string) => void;
  removeTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleDone, editTodo, removeTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          editTodo={editTodo}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
