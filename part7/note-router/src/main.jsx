import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppMisc from './AppMisc.jsx'
import { BrowserRouter as Router } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <Router>
    {/* <App /> */}
    <AppMisc />
  </Router>
)
