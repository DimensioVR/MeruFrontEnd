import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    

    try {
      // Sending POST request to your Rails API for registration
      const response = await axios.post('http://localhost:3000/users', {
        "user":{ 
          email: email,
          password: password,
        }   
       });

      // Assuming the API returns a JWT token on successful registration
      localStorage.setItem('token', response.data.token);

      // Redirecting to the products page after successful registration
      navigate('/products');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirmation"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-link"
            style={{ padding: 0, textDecoration: 'underline', color: 'blue' }}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;