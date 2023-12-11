import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

interface AddTodoFormProps {
  addTodo: (name: string, dueDate: Date) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState(new Date()); // Nouvel état pour la date

  // function onChange(nextValue: React.SetStateAction<Date>) {
  //   setDueDate(nextValue);
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodo, new Date(dueDate));
    setNewTodo('');
    // setDueDate();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        className="flex-1 border border-gray-300 p-2 rounded-l"
        placeholder="Add a new task"
      />
      <DatePicker 
        className="flex-1 border border-gray-300 p-2 rounded-l"
        dateFormat="dd/MM/yyyy"
        selected={dueDate} 
        onChange={(date: React.SetStateAction<Date>) => setDueDate(date)} 
        minDate={new Date()}
      />
      {/* <Calendar onChange={(value) => setDueDate(value as Date)} /> */}
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
