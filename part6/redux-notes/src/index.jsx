import ReactDOM from 'react-dom/client'
// Import Provider to make the Redux store available to the app
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

// Render the React app, wrapping it in the Provider so all components can access the store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
