import React from "react";

export default class RemoveTodo extends React.Component {
  constructor() {
    super()
    this.removeTodo = this.removeTodo.bind(this)
  }

  removeTodo(e) {
    const task = e.target.parentElement.dataset.task
    this.props.deleteTodo(task)
  }

  render() {
    return (
      <span onClick={(e) => {this.removeTodo(e)}}> {this.props.icon} </span>
    );
  }
}
