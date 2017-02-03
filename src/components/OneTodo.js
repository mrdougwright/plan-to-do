import React from 'react'
import RemoveTodo from './RemoveTodo'


class OneTodo extends React.Component {
  constructor() {
    super()
    this.state = {
      completed: false,
      icon: "🔥"
    }
    this.toggleComplete = this.toggleComplete.bind(this)
    this.taskComplete = this.taskComplete.bind(this)
  }

  toggleComplete(e) {
    var newState = !this.state.completed
    var newIcon = (this.state.icon === "🔥") ? "✅" : "🔥"
    this.setState({
      completed: newState,
      icon: newIcon
    })
  }

  taskComplete(e) {
    return this.state.completed ? "complete" : ""
  }

  render() {
    return (
      <li
        data-task={this.props.task} onClick={this.toggleComplete}>
        <RemoveTodo deleteTodo={this.props.deleteTodo} icon={this.state.icon}/>
        <span className={this.taskComplete()}>
          {this.props.task}
        </span>
      </li>
    )
  }
}

export default OneTodo;
