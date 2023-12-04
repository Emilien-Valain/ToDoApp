import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(name: string) {
    setTodos([...todos, { id: uuidv4(), name, done: false }]);
  }

  function toggleDone(id: string) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  function editTodo(id: string, newName: string) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, name: newName } : todo));
  }

  function removeTodo(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const unfinishedTodos = todos.filter(todo => !todo.done);
  const finishedTodos = todos.filter(todo => todo.done);

  return (
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-4xl text-center">Todo App</h1>
      <AddTodoForm addTodo={addTodo} />
      <h2 className="text-2xl">Unfinished Todos</h2>
      <TodoList
        todos={unfinishedTodos}
        editTodo={editTodo}
        toggleDone={toggleDone}
        removeTodo={removeTodo}
      />
      <h2 className="text-2xl">Finished Todos</h2>
      <TodoList
        todos={finishedTodos}
        editTodo={editTodo}
        toggleDone={toggleDone}
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default App;
