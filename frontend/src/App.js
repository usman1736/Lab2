import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChuckNorris from './components/ChuckNorris';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (nextToken) => {
    setToken(nextToken);
    setError('');
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleUsernameChange = (nextUsername) => {
    setUsername(nextUsername);
  };

  const handlePasswordChange = (nextPassword) => {
    setPassword(nextPassword);
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('http://localhost:3333/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (logoutError) {
        console.error('Logout error:', logoutError);
      }
    }

    setToken(null);
    setError('');
    setUsername('');
    setPassword('');
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
            username={username}
            password={password}
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
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
