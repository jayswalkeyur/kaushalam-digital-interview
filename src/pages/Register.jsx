import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Registering user with data:', {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      try {
        const response = await axios.post('http://localhost:3000/api/register', {
          firstName,
          lastName,
          email,
          password,
          role,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Registration successful', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error calling the API:', error);

        if (error.response) {
          console.error('API response:', error.response.data);
          setApiError(error.response.data.message || 'Registration failed. Please try again.');
        } else if (error.request) {
          console.error('No response received:', error.request);
          setApiError('No response from server. Please try again later.');
        } else {
          console.error('Error message:', error.message);
          setApiError('An unexpected error occurred. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Create an Account</h2>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              placeholder="Enter your first name"
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              placeholder="Enter your last name"
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>

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

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
            >
              <option value="">Select your role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <p className="text-center mt-3">
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/login')} className="btn btn-link">
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
