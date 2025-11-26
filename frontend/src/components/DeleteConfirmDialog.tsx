import React from 'react';
import { Customer } from '../services/customerService';
import './DeleteConfirmDialog.css';

interface DeleteConfirmDialogProps {
  customer: Customer;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  customer,
  onConfirm,
  onCancel,
  loading = false
}) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h3>Confirm Delete</h3>
        </div>
        
        <div className="dialog-content">
          <p>Are you sure you want to delete this customer?</p>
          <div className="customer-info">
            <strong>{customer.name}</strong><br />
            {customer.email}<br />
            {customer.phone}
          </div>
          <p className="warning">This action cannot be undone.</p>
        </div>
        
        <div className="dialog-actions">
          <button 
            className="btn btn-cancel" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-delete" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Customer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
