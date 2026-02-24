import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess, onLoginError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    } else if (!username.includes('@')) {
      errors.username = 'Username must be a valid email address';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (validationErrors.username) {
      setValidationErrors({
        ...validationErrors,
        username: ''
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (validationErrors.password) {
      setValidationErrors({
        ...validationErrors,
        password: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.uuid) {
        onLoginSuccess(data.uuid);
        setUsername('');
        setPassword('');
        setValidationErrors({});
      } else {
        onLoginError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      onLoginError('Unable to connect to the server. Please try again later.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="username">Username (Email):</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className={validationErrors.username ? 'error' : ''}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {validationErrors.username && (
            <span className="error-text">{validationErrors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={validationErrors.password ? 'error' : ''}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          {validationErrors.password && (
            <span className="error-text">{validationErrors.password}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;