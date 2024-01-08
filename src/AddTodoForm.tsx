import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface AddTodoFormProps {
  addTodo: (name: string, dueDate: Date) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodo, dueDate);
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        className="flex-1 px-2 py-1 border border-gray-300 rounded-md"
        placeholder="Add a new task"
      />
      <DatePicker 
        className="px-2 py-1 border border-gray-300 rounded-md"
        dateFormat="dd/MM/yyyy"
        selected={dueDate}
        onChange={(date: Date) => setDueDate(date)}
        minDate={new Date()}
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-md">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
