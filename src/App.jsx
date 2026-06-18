import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='app'>
      <Navbar/>
      {/* The <Routes> component needs to be a child component of the <BrowserRouter> component */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="*" element={<NotFound/>} /> {/* A fallback route for URLs that don't match the paths above */}
      </Routes>
    </div>
  )
}

export default App
