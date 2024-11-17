import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Main/Home';
import MainHome from './Pages/Main/MainHome';
import Property from './Pages/Customer/Property';
import PaymentPage from './Pages/Customer/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bodims" element={<Property />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
