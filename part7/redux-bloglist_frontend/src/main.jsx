import ReactDOM from 'react-dom/client'
import App from './App'
// Importing the store and making it available for all the application
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)