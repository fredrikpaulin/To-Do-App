import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {TStore} from './contexts/TasksContext'
import './reset.css'

ReactDOM.render(
  <React.StrictMode>
    <TStore>
      <App />
    </TStore>
  </React.StrictMode>,
  document.getElementById('root')
)
