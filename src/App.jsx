import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import FundingBarChart from './components/FundingBarChart';
import IndustryTrendChart from './components/IndustryTrendChart';
import './App.css';

function App() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('/funding.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setFundingData(data))
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Startup Funding Tracker</h1>
      </header>
      <main>
        <div className="chart-container">
          <ErrorBoundary>
            <FundingBarChart fundingData={fundingData} />
          </ErrorBoundary>
        </div>
        <div className="chart-container">
          <ErrorBoundary>
            <IndustryTrendChart fundingData={fundingData} />
          </ErrorBoundary>
        </div>
      </main>
      <footer>
        <p>Startup Funding Tracker © 2025</p>
      </footer>
    </div>
  );
}

export default App;
