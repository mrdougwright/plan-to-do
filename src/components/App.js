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
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    // after successful auth, keep user logged in
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user })
      }
    })

    base.syncState(`${this.props.params.listId}/todos`, {
      context: this,
      state: 'todos',
      asArray: true
    })
  }

  addTodo(todo, todosArray) {
    this.setState({
      todos: todosArray.concat([todo]),
      currentTodo: ''
    })
  }

  removeTodo(todo, todosArray) {
    const i = todosArray.indexOf(todo)
    todosArray.splice(i, 1)
    this.setState({
      todos: todosArray
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

  logout() {
    base.unauth()
    this.setState({ uid: null })
  }

  renderLogin() {
    return (
      <nav>
        <button className='github' onClick={() => this.authenticate('github')}>Login w/ Github</button>
      </nav>
    )
  }


  render() {
    const logout = <button style={{float: 'right'}} onClick={this.logout}>Log Out</button>

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
          createTodo={(newTask) => {this.addTodo(newTask, this.state.todos)}}
        />
        <ToDoList todos={this.state.todos} deleteTodo={(task) => {this.removeTodo(task, this.state.todos)}}/>
      </div>
    );
  }
}
