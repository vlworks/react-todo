import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Custom Hooks
function useInputValue(defaultValue = ' ') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  }
}

function AddTodo({ onCreate }) {
  const input = useInputValue('')

  function handlerSubmit(event) {
    event.preventDefault()
    if (input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  // ...input.bind - Use custom Hooks
  return (
    <form className={'form'} onSubmit={handlerSubmit}>
      <input type='text' className={'input-todo'} {...input.bind} />
      <button type='submit' className={'input-submit'}>
        Add todo
      </button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default AddTodo
