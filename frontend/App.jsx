import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChuckNorris from './components/ChuckNorris';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = (token) => {
    setToken(token);
    setError('');
  };

  const handleLogout = () => {
    setToken(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chuck Norris Facts App</h1>
      </header>
      <main>
        {error && <div className="error-message">{error}</div>}
        
        {!token ? (
          <LoginForm 
            onLoginSuccess={handleLogin}
            onLoginError={handleError}
          />
        ) : (
          <>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            <ChuckNorris token={token} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;