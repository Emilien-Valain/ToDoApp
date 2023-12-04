import React, { useState } from 'react';
import { Todo } from './types';

interface TodoItemProps {
  todo: Todo;
  toggleDone: (id: string) => void;
  editTodo: (id: string, newName: string) => void;
  removeTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleDone, editTodo, removeTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.name);

  const handleSave = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(todo.id)}
        className="form-checkbox h-5 w-5"
      />
      {isEditing ? (
        <input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          className="flex-1 mx-2 p-2 border border-gray-300 rounded"
        />
      ) : (
        <span className={`flex-1 mx-2 ${todo.done ? "line-through" : ""}`}>{todo.name}</span>
      )}
      {isEditing ? (
        <>
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded ml-2">
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">
            Edit
          </button>
          <button onClick={() => removeTodo(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2">
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
