require('dotenv').config()
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'
import App from './components/App'
import ListPicker from './components/ListPicker'
import NotFound from './components/NotFound'

const Root = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Route path="/" component={ListPicker} />
        <Route path="/(:listId)" component={App} />
        <Route path="*" component={NotFound} />
      </div>
    </Router>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);
