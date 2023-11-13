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
    <div class="flex flex-col items-center space-y-3">
      <h1 class="text-4xl text-center">Todo App</h1>
      <div class="flex flex-row justify-center space-x-2">
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} class="outline rounded-md focus:outline-none focus:ring focus:border-blue-500 "/>
        <button onClick={addTodo} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Todo
        </button>
      </div>
      <h2 class="text-2xl">Todo</h2>
      <ul class="space-y-3">
        {unfinishedTodos.map((todo, index) => (
          <li key={index} class="space-x-2">
            <input type="checkbox" checked={todo.done} onChange={() => toggleDone(index)} />
            {todo.name}
            <button onClick={() => removeTodo(index)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
          </li>
        ))}
      </ul>
      <h2 class="text-2xl">Done</h2>
      <ul class="space-y-3">
        {finishedTodos.map((todo, index) => (
          <li key={index} class="space-x-2">
            <input type="checkbox" checked={todo.done} onChange={() => toggleDone(index)} />
            {todo.name}
            <button onClick={() => removeTodo(index)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}

export default App