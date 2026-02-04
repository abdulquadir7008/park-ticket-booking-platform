import React from 'react';
import '../styles/LoadingSpinner.css';

/**
 * Loading Spinner Component
 * Reusable loading indicator
 */
const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner ${size}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;