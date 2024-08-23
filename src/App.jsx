import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProductsPage from './ProductsPage';
import EditProductPage from './EditProductPage';
import Header from './Header'; // Importa el componente Header

function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Incluye el Header en la parte superior */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/productos/editar/:id" element={<EditProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;