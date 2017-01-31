import React from "react";

export default class NewTodo extends React.Component {
  constructor() {
    super()
    this.handleEnterKey = this.handleEnterKey.bind(this)
    this.handleFormValue = this.handleFormValue.bind(this)
  }

  handleEnterKey(e) {
    return !!(e.keyCode === 13 || e.key === 'Enter')
  }

  handleFormValue(e) {
    if (this.handleEnterKey(e)) {
      this.props.createTodo(e.target.value)
    }
  }

  render() {
    return (
      <input
        value={this.props.formValue}
        onChange={this.props.onChange}
        onKeyDown={(e) => {this.handleFormValue(e)}}>
      </input>
    );
  }
}
