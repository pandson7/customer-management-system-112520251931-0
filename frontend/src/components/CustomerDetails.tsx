import React from 'react';
import { Customer } from '../services/customerService';
import './CustomerDetails.css';

interface CustomerDetailsProps {
  customer: Customer;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  onEdit,
  onDelete,
  onBack
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="customer-details">
      <div className="details-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to List
        </button>
        <h2>Customer Details</h2>
      </div>

      <div className="details-content">
        <div className="detail-group">
          <label>Name</label>
          <p>{customer.name}</p>
        </div>

        <div className="detail-group">
          <label>Email</label>
          <p>{customer.email}</p>
        </div>

        <div className="detail-group">
          <label>Phone</label>
          <p>{customer.phone}</p>
        </div>

        <div className="detail-group">
          <label>Address</label>
          <p>{customer.address}</p>
        </div>

        <div className="detail-group">
          <label>Registration Date</label>
          <p>{formatDate(customer.registrationDate)}</p>
        </div>

        <div className="detail-group">
          <label>Customer ID</label>
          <p className="customer-id">{customer.customerId}</p>
        </div>
      </div>

      <div className="details-actions">
        <button className="btn btn-edit" onClick={onEdit}>
          Edit Customer
        </button>
        <button className="btn btn-delete" onClick={onDelete}>
          Delete Customer
        </button>
      </div>
    </div>
  );
};

export default CustomerDetails;
