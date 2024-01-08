import React, { useState } from 'react';
import { Todo } from './types';
import DatePicker from 'react-datepicker';
import { useSwipeable } from 'react-swipeable';
import "react-datepicker/dist/react-datepicker.css";

interface TodoItemProps {
  todo: Todo;
  toggleDone: (id: string) => void;
  editTodo: (id: string, newName: string, newDate: Date | undefined) => void;
  removeTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleDone, editTodo, removeTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.name);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ? todo.dueDate : undefined);
  const [swipeState, setSwipeState] = useState({ direction: '', distance: 0 });

  const handleSwipeAction = () => {
    if (swipeState.direction === 'Left') {
      removeTodo(todo.id);
    } else if (swipeState.direction === 'Right') {
      setIsEditing(true);
    }
    setSwipeState({ direction: '', distance: 0 });
  };

  const handlers = useSwipeable({
    onSwiped: handleSwipeAction,
    onSwiping: (event) => setSwipeState({ direction: event.dir, distance: event.deltaX }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const translateStyle = {
    transform: `translateX(${swipeState.distance}px)`,
    transition: swipeState.direction ? 'none' : 'transform 0.2s ease-in-out'
  };

  const handleSave = () => {
    editTodo(todo.id, editText, editDueDate);
    setIsEditing(false);
  };

  return (
    <div style={translateStyle}>
    <div {...handlers} className="flex justify-between items-center bg-white p-3 rounded shadow mb-2 transition duration-500 ease-in-out">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(todo.id)}
        className="form-checkbox h-5 w-5"
      />
      {isEditing ? (
        <div>
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
            className="flex-1 mx-2 p-2 border border-gray-300 rounded"
          />
          <DatePicker 
            className="flex-1 mx-2 p-2 border border-gray-300 rounded"
            dateFormat="dd/MM/yyyy"
            selected={editDueDate}
            onChange={(date: Date | null) => setEditDueDate(date)}  
            minDate={new Date()}
          />
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded ml-2">
            Cancel
          </button>
        </div>
      ) : (
        
        <div className="flex justify-between items-center mx-2">
        <div className="flex-1">
          <span className={`${todo.done ? "line-through" : ""}`}>{todo.name}</span>
          {todo.dueDate && (
            <span className="text-sm text-gray-500 ml-2">
              (Due: {todo.dueDate.toLocaleDateString()})
            </span>
          )}
        </div>
        <div>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded ml-2 mr-2">
            Edit
          </button>
          <button onClick={() => removeTodo(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
            Delete
          </button>
        </div>
      </div>
      
      )}
    </div>
    </div>
  );
};

export default TodoItem;
