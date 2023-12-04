import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string;
  name: string;
  done: boolean;
  dueDate?: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editTodoText, setEditTodoText] = useState<string>('');
  const [editTodoId, setEditTodoId] = useState<string>('');

  function addTodo() {
    setTodos([...todos, { id: uuidv4(), name: newTodo, done: false }]);
    setNewTodo('');
  }

  function editTodo(id: string, newName: string) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, name: newName } : todo));
    setEditTodoId('');
    setEditTodoText('');
  }

  function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditTodoText(e.target.value);
  }

  function toggleDone(id: string) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  function removeTodo(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const unfinishedTodos = todos.filter(todo => !todo.done);
  const finishedTodos = todos.filter(todo => todo.done);

  return (
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-4xl text-center">Todo App</h1>
      <div className="flex flex-row justify-center space-x-2">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="outline-none border border-gray-300 bg-white p-2 rounded-md focus:shadow-inner focus:border-black hover:border-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Todo
        </button>
      </div>
      <h2 className="text-2xl">Todo</h2>
      <ul className="space-y-3">
        {unfinishedTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo.id)}
            />
            {editTodoId === todo.id ? (
              <input
                value={editTodoText}
                onChange={handleEditInputChange}
                className="outline-none border border-gray-300 bg-white p-2 rounded-md focus:shadow-inner focus:border-black hover:border-blue-500"
              />
            ) : (
              <span className="flex-grow">{todo.name}</span>
            )}
            {editTodoId === todo.id ? (
              <>
                <button
                  onClick={() => editTodo(todo.id, editTodoText)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTodoId('')}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setEditTodoId(todo.id);
                  setEditTodoText(todo.name);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => removeTodo(todo.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl">Done</h2>
      <ul className="space-y-3">
        {finishedTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo.id)}
            />
            <span className="flex-grow">{todo.name}</span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
