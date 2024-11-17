import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Main/Home';
import MainHome from './Pages/Main/MainHome';
import Products from './Pages/Customer/Products';
import PaymentPage from './Pages/Customer/PaymentPage';
import Cart from './Pages/Customer/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
