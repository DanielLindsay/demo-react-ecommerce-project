import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

{/* The createRoot() method allows the React library to run within an element with the id 'root', which is found in the index.html page */}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter allows its child components to use the <Routes> component to perform URL routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
