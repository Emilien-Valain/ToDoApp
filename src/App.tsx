import { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { Todo } from './types';
import { db } from './firebase';
import { ref, push, onValue, update, remove, set } from "firebase/database";
import { useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);


  useEffect(() => {
    const todosRef = ref(db, 'todos');
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedTodos = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          dueDate: data[key].dueDate ? new Date(data[key].dueDate) : null // Convertir en Date ou garder null
        }));
        setTodos(loadedTodos);
      }
    });
  }, []);
  
  function addTodo(name: string, dueDate?: Date) {
    const newTodoRef = push(ref(db, 'todos'));
    set(newTodoRef, {
      name, 
      dueDate: dueDate ? dueDate.toISOString() : null,
      done: false
    });
  }
  

  function toggleDone(id: string) {
    const todoRef = ref(db, `todos/${id}`);
    update(todoRef, { done: !todos.find(todo => todo.id === id).done });
  }
  
  function editTodo(id: string, newName: string, newDate?: Date) {
    const todoRef = ref(db, `todos/${id}`);
    update(todoRef, { name: newName, dueDate: newDate });
  }
  
  function removeTodo(id: string) {
    const todoRef = ref(db, `todos/${id}`);
    remove(todoRef);
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
