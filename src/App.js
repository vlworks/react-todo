import React, { useEffect } from 'react'
import Context from './context'
import TodoList from './Todo/TodoList'
// import AddTodo from './Todo/AddTodo' - LazyLoading
import Loader from './Loader'
import Modal from './Modal/Modal'

// LazyLoading
// Origin Lazy
//const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

// Emulate timeout lazyload
const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 1500)
    })
)

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])

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

  // Suspense - use LazyLoad - fallback use time loading
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>React Todo List</h1>

        <Modal />

        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
