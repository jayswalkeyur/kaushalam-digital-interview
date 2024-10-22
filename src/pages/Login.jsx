import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';

    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('https://9834-103-240-170-60.ngrok-free.app/api/login', {
          email,
          password,
        });

        // Check if response contains the token
        if (response.data.token) {
          localStorage.setItem('token', response.data.token); // Store token in local storage
          navigate('/dashboard'); // Redirect to dashboard
        } else {
          setApiError('No token returned. Please try again.');
        }
      } catch (error) {
        console.error('Error calling the API:', error);
        if (error.response) {
          setApiError(error.response.data.message || 'Login failed. Please try again.');
        } else {
          setApiError('An unexpected error occurred. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Login</h2>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-link">
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
