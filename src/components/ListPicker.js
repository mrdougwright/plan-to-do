import React from 'react'
import { getFunName } from '../helpers'
import { browserHistory } from 'react-router'


class ListPicker extends React.Component {

  goToList(event) {
    event.preventDefault()
    const listId = this.listInput.value
    console.log(`Going to ${listId}`)
    browserHistory.push(`/list/${listId}`)
  }

  render() {
    return (
      <form onSubmit={(e) => this.goToList(e)}>
        <h2>Please Enter A List</h2>
        <input type="text" required placeholder="List Name" defaultValue={getFunName()} ref={(input) => {this.listInput = input}} />
        <button type="submit">Visit List -></button>
      </form>
    )
  }
}

ListPicker.contextTypes = {
  router: React.PropTypes.object
}

export default ListPicker;
