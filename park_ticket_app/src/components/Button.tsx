import React from 'react';
import '../styles/Button.css';

/**
 * Button Component
 * Reusable button with different variants
 */
const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  loading = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''} ${loading ? 'btn-loading' : ''}`}
    >
      {loading ? (
        <>
          <span className="btn-spinner"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;