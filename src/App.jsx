import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className='app'>
          <Navbar/>
          {/* The <Routes> component needs to be a child component of the <BrowserRouter> component */}
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="*" element={<NotFound/>} /> {/* A fallback route for URLs that don't match the paths above */}
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
