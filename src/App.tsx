import { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { Todo } from './types';
import { db } from './firebase';
import { get } from "firebase/database";
import { ref, push, onValue, update, remove, set } from "firebase/database";
import { useEffect } from 'react';
import emailjs from 'emailjs-com';
import TasksOTD from './TasksOTD';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [email, setEmail] = useState('');


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
    }).then(() => {
      checkAndSendEmails();
    });
  }

  function checkAndSendEmails() {
    const today = new Date();
    const unfinishedTasks = todos.filter(todo => !todo.done && isToday(todo.dueDate, today));
  
    if (unfinishedTasks.length > 0) {
      const message = unfinishedTasks.map(todo => `- ${todo.name}`).join('\n');
      sendEmailToAllUsers(message);
    }
  }

  function isToday(todoDate, today) {
    return todoDate.getDate() === today.getDate() &&
           todoDate.getMonth() === today.getMonth() &&
           todoDate.getFullYear() === today.getFullYear();
  }

  // La fonction n'a pas de sens dans un contexte réel mais pour tester l'envoi d'email, c'est pratique
  function sendEmailToAllUsers(message) {
    const emailsRef = ref(db, 'emails');
    get(emailsRef).then((snapshot) => {
      const emails = snapshot.val();
      console.log('Emails to be sent:', emails); // Logging des adresses
      if (emails) {
        Object.values(emails).forEach(email => {
          console.log('Sending email to:', email); // Logging avant l'envoi
          sendEmail(email, message);
        });
      }
    }).catch((error) => {
      console.log("Error getting emails:", error);
    });
  }
  
  
  function sendEmail(email, message) {
    const templateParams = {
      email: email, 
      message: message
    };
  
    emailjs.send('service_digcwgs', 'template_16gejnl', templateParams, 'aIgSwf8K1bSPaQIlN')
      .then((response) => {
        console.log('Email sent!', response.status, response.text);
      }, (err) => {
        console.log('Failed to send email.', err);
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

  const addEmail = () => {
    const emailRef = ref(db, 'emails');
    push(emailRef, email);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-4xl text-center">Todo App</h1>
      <AddTodoForm addTodo={addTodo} />
      <h2 className="text-2xl">Unfinished Todos</h2>
      <TodoList
        todos={unfinishedTodos.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) {
            return 0;
          }
          if (!a.dueDate) {
            return -1;
          }
          if (!b.dueDate) {
            return 1;
          }
          return a.dueDate.getTime() - b.dueDate.getTime();
        })}
        editTodo={editTodo}
        toggleDone={toggleDone}
        removeTodo={removeTodo}
      />
      <h2 className="text-2xl">Finished Todos</h2>
      <TodoList
        todos={finishedTodos.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) {
            return 0;
          }
          if (!a.dueDate) {
            return -1;
          }
          if (!b.dueDate) {
            return 1;
          }
          return a.dueDate.getTime() - b.dueDate.getTime();
        })}
        editTodo={editTodo}
        toggleDone={toggleDone}
        removeTodo={removeTodo}
      />
      <TasksOTD finishedTodos={finishedTodos} />

      <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="input-class flex-1 border border-gray-300 p-2 rounded-l"
      />
      <button onClick={addEmail} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r">Add Email</button>
    </div>
  );
}

export default App;
