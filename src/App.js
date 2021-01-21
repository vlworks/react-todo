import React from 'react'
import Context from './context'
import TodoList from './Todo/TodoList'
import AddTodo from './Todo/AddTodo'

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, title: 'Buy 1', complited: false },
    { id: 2, title: 'Buy 2', complited: true },
    { id: 3, title: 'Buy 3', complited: false },
  ])

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complited = !todo.complited
        }
        return todo
      })
    )
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          compited: false,
        },
      ])
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>React tutorial</h1>

        <AddTodo onCreate={addTodo} />

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
