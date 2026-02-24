import React, { useState, useEffect } from 'react';

const ChuckNorris = ({ token }) => {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFact = async () => {
      try {
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

    fetchFact();
  }, [token]);

  if (isLoading) {
    return (
      <div className="fact-container">
        <div className="loading-spinner"></div>
        <p>Loading Chuck Norris fact...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fact-container error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="fact-container">
      <h2>Chuck Norris Fact:</h2>
      <p className="fact-text">{fact}</p>
    </div>
  );
};

export default ChuckNorris;