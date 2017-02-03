import React from 'react'
import OneTodo from './OneTodo'

class TodoList extends React.Component {

  render() {
    return (
      <ul>
        {
          this.props.todos.map(task => {
            return (
              <OneTodo
                task={task}
                deleteTodo={this.props.deleteTodo}
                key={Math.random()}
              />
            )
          })
        }
      </ul>
    )
  }
}

export default TodoList;
