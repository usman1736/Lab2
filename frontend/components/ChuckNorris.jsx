import React, { useState, useEffect } from 'react';
import './ChuckNorris.css'; 

const ChuckNorris = ({ token }) => {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFact = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3333/fact', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setFact(data.fact);
          setError('');
        } else {
          setError(data.message || 'Failed to fetch fact');
        }
      } catch (error) {
        setError('Unable to connect to the server');
        console.error('Fact fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchFact();
    }
  }, [token]);

  // Enhanced loading spinner with better visual
  if (isLoading) {
    return (
      <div className="chuck-norris-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Fetching a Chuck Norris fact...</p>
          <p className="loading-subtitle">This might take a moment</p>
        </div>
      </div>
    );
  }

  // Enhanced error display with retry button
  if (error) {
    return (
      <div className="chuck-norris-container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Enhanced fact display with better styling
  return (
    <div className="chuck-norris-container">
      <div className="fact-card">
        <h2>Chuck Norris Fact</h2>
        <div className="fact-content">
          <p className="fact-text">{fact}</p>
        </div>
        <div className="fact-footer">
          <p className="fact-note">Random Chuck Norris fact just for you!</p>
        </div>
      </div>
    </div>
  );
};

export default ChuckNorris;
