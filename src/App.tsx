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
    <div class="flex flex-col flex-auto">
      <div class="flex flex-row">
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} class="outline rounded-md focus:outline-none focus:ring focus:border-blue-500 "/>
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <h2>Todo</h2>
      <ul>
        {unfinishedTodos.map((todo, index) => (
          <li key={index}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleDone(index)} />
            {todo.name}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Done</h2>
      <ul>
        {finishedTodos.map((todo, index) => (
          <li key={index}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleDone(index)} />
            {todo.name}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}

export default App