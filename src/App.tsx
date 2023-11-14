import { useState } from 'react'

type Todo = {
  name: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<string>('')

  function addTodo() {
    setTodos([...todos, { name: newTodo, done: false }])
    setNewTodo('')
  }

  function toggleDone(index: number) {
    setTodos(todos.map((todo, i) => i === index ? { ...todo, done: !todo.done } : todo))
  }

  function removeTodo(index: number) {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const unfinishedTodos = todos.filter(todo => !todo.done)
  const finishedTodos = todos.filter(todo => todo.done)

  return (
    <>
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
          {unfinishedTodos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(index)}
              />
              <span className="flex-grow">{todo.name}</span>
              <button
                onClick={() => removeTodo(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl">Done</h2>
        <ul className="space-y-3">
          {finishedTodos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(index)}
              />
              <span className="flex-grow">{todo.name}</span>
              <button
                onClick={() => removeTodo(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
  
}

export default App