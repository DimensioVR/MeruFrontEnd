import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/producto', {
        name: name,
        description: description,
        stock: parseFloat(stock),
        price: parseFloat(price),
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Limpiar los campos del formulario
      setName('');
      setDescription('');
      setStock('');
      setPrice('');

      // Notificar al componente padre que se agregó un nuevo producto
      onProductAdded(response.data);
    } catch (err) {
      setError('Error al agregar el producto. Inténtalo de nuevo.');
      console.error(err);
    }
  };

  return (
    <div className="card p-4 shadow mb-4" style={{ width: '50rem' }}>
      <h3 className="text-center">Agregar Nuevo Producto</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Ingresa el nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Ingresa la descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            placeholder="Cantidad en stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            placeholder="Precio del producto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;