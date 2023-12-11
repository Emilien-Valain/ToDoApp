import React, { useState } from 'react';

interface AddTodoFormProps {
  addTodo: (name: string, dueDate: Date) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState(''); // Nouvel état pour la date

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodo, new Date(dueDate));
    setNewTodo('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        className="flex-1 border border-gray-300 p-2 rounded-l"
        placeholder="Add a new task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="flex-1 border border-gray-300 p-2 rounded-r"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
