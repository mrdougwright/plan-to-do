import '../App.css';
import React from "react";
import base from '../config/firebase'
import NewTodo from "./NewTodo";
import ToDoList from "./ToDoList";

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      currentTodo: '',
      uid: null,
      owner: null
    }
    this.updateTodos = this.updateTodos.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
  }

  componentDidMount() {
    base.syncState(`${this.props.params.listId}/todos`, {
      context: this,
      state: 'todos',
      asArray: true
    })
  }

  updateTodos(todosArray) {
    this.setState({
      todos: todosArray.concat([this.state.currentTodo]),
      currentTodo: ''
    })
  }

  authenticate(provider) {
    console.log(`logging in with ${provider}`)
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler(err, authData) {
    if (err) { console.error(err); return; }

    const listRef = base.database().ref(this.props.params.listId)

    listRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}

      if(!data.owner) {
        listRef.set({ owner: authData.user.uid })
      }
      console.log(data)
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid,
        todos: data.todos || []
      })
    })
  }

  renderLogin() {
    return (
      <nav>
        <button className='github' onClick={() => this.authenticate('github')}>Login w/ Github</button>
      </nav>
    )
  }


  render() {
    const logout = <button>Log Out</button>

    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the list owner!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        {logout}
        <NewTodo
          formValue={this.state.currentTodo}
          onChange={(e) => this.setState({currentTodo: e.target.value})}
          createTodo={(e) => {this.updateTodos(this.state.todos)}}
        />
        <ToDoList todos={this.state.todos}/>
      </div>
    );
  }
}
