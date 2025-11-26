import React, { useState, useEffect } from 'react';
import customerService, { Customer, CreateCustomerData } from '../services/customerService';
import './CustomerForm.css';

interface CustomerFormProps {
  customer?: Customer;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState<CreateCustomerData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      });
    }
  }, [customer]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      let savedCustomer: Customer;

      if (customer) {
        savedCustomer = await customerService.updateCustomer(customer.customerId, formData);
      } else {
        savedCustomer = await customerService.createCustomer(formData);
      }

      onSave(savedCustomer);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      if (errorMessage.includes('Email address is already in use')) {
        setErrors({ email: 'Email address is already in use' });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="customer-form">
      <h2>{customer ? 'Edit Customer' : 'Create New Customer'}</h2>
      
      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="+1234567890"
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            rows={3}
          />
          {errors.address && <span className="field-error">{errors.address}</span>}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : (customer ? 'Update Customer' : 'Create Customer')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
