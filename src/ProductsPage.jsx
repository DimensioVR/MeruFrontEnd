import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddProductForm from './AddProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/producto', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setError('Error al cargar los productos.');
        setLoading(false);
      }
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/producto/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      setError('Error al eliminar el producto.');
    }
  };

  const handleEditClick = (productId) => {
    navigate(`/productos/editar/${productId}`);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Productos</h2>

      {/* Formulario para agregar producto */}
      <AddProductForm
        onProductAdded={handleProductAdded}
      />

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4 shadow-sm" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                <p className="card-text"><strong>Precio:</strong> ${product.price}</p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditClick(product.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;