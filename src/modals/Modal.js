import React from 'react';
import '../css/Modal.css'; // Import the CSS for the modal

const Modal = ({ isOpen, onClose, message, onConfirm, showActions=true }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-message">{message}</p> {/* Sử dụng lớp modal-message */}
        {showActions && (
          <div className="modal-actions">
            <button className="modal-button" onClick={onConfirm}>Confirm</button>
            <button className="modal-button" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
