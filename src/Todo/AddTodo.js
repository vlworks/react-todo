import React, { useState } from 'react'
import PropTypes from 'prop-types'

function AddTodo({ onCreate }) {
  const [value, setValue] = useState('')

  function handlerSubmit(event) {
    event.preventDefault()
    if (value.trim()) {
      onCreate(value)
      setValue('')
    }
  }

  return (
    <form className={'form'} onSubmit={handlerSubmit}>
      <input
        type='text'
        className={'input-todo'}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
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
