import React from 'react'

const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map(task => (<li key={Math.random()}>{task}</li>))}
    </ul>
  )
}

export default TodoList;
