import React from 'react'
import RemoveTodo from './RemoveTodo'

const TodoList = (props) => {
  return (
    <ul>
      {
        props.todos.map(task => {
          return (
            <li key={Math.random()} data-task={task}>
              <RemoveTodo deleteTodo={props.deleteTodo}/>
              <span>{task}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

export default TodoList;
