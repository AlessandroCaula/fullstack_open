import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './AppSimple.jsx'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <Router>
    {/* <App /> */}
    <App />
  </Router>
)
