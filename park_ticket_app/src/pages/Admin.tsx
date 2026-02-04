import React, { useState } from 'react';
import apiService from '../services/api';
import Button from '../components/Button';
import '../styles/Admin.css';

/**
 * Admin Page
 * QR code validation for gate staff
 */
const Admin = () => {
  const [qrCode, setQrCode] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();

    if (!qrCode.trim()) {
      alert('Please enter a QR code');
      return;
    }

    try {
      setLoading(true);
      setValidationResult(null);

      const response = await apiService.validateQrCode(qrCode.trim());
      setValidationResult(response);
    } catch (err) {
      setValidationResult({
        success: false,
        valid: false,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsUsed = async () => {
    if (!qrCode.trim()) return;

    try {
      setLoading(true);
      await apiService.markAsUsed(qrCode.trim());
      
      // Re-validate to show updated status
      const response = await apiService.validateQrCode(qrCode.trim());
      setValidationResult(response);
      
      alert('Ticket marked as used successfully');
    } catch (err) {
      alert('Error marking ticket as used: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQrCode('');
    setValidationResult(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gate Staff Validation</h1>
          <p>Scan or enter QR code to validate tickets</p>
        </div>

        <form onSubmit={handleValidate} className="validation-form">
          <div className="form-group">
            <label htmlFor="qrCode">QR Code / Booking ID</label>
            <input
              type="text"
              id="qrCode"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              placeholder="Enter booking ID or scan QR code"
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary-dark" loading={loading}>
              Validate Ticket
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Clear
            </Button>
          </div>
        </form>

        {validationResult && (
          <div className={`validation-result ${validationResult.valid ? 'valid' : 'invalid'}`}>
            <div className="result-icon">
              {validationResult.valid ? '✓' : '✗'}
            </div>

            <h2>{validationResult.message}</h2>

            {validationResult.booking && (
              <div className="booking-details">
                <div className="detail-row">
                  <span>Booking ID:</span>
                  <strong>{validationResult.booking.id}</strong>
                </div>
                <div className="detail-row">
                  <span>Name:</span>
                  <strong>{validationResult.booking.name}</strong>
                </div>
                {validationResult.booking.email && (
                  <div className="detail-row">
                    <span>Email:</span>
                    <strong>{validationResult.booking.email}</strong>
                  </div>
                )}
                <div className="detail-row">
                  <span>Date:</span>
                  <strong>{validationResult.booking.date}</strong>
                </div>
                <div className="detail-row">
                  <span>Time:</span>
                  <strong>{validationResult.booking.timeSlot}</strong>
                </div>
                <div className="detail-row">
                  <span>Tickets:</span>
                  <strong>{validationResult.booking.tickets} person(s)</strong>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <strong className={`status-${validationResult.booking.status}`}>
                    {validationResult.booking.status}
                  </strong>
                </div>
              </div>
            )}

            {validationResult.valid && validationResult.booking?.status === 'active' && (
              <div className="result-actions">
                <Button onClick={handleMarkAsUsed} variant="primary-dark">
                  Mark as Used
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="admin-info">
          <h3>Instructions</h3>
          <ul>
            <li>Enter the booking ID from the ticket QR code</li>
            <li>The system will validate the ticket and show booking details</li>
            <li>Valid tickets will show a green checkmark</li>
            <li>Invalid or expired tickets will show a red cross</li>
            <li>Mark tickets as used after entry</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;