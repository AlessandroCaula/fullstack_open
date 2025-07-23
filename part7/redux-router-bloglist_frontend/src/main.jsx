import ReactDOM from 'react-dom/client'
import App from './App'
// Importing the store and making it available for all the application
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)