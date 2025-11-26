import React, { useState, useEffect } from 'react';
import customerService, { Customer } from '../services/customerService';
import './CustomerList.css';

interface CustomerListProps {
  onViewCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customer: Customer) => void;
  searchTerm: string;
}

const CustomerList: React.FC<CustomerListProps> = ({
  onViewCustomer,
  onEditCustomer,
  onDeleteCustomer,
  searchTerm
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, [searchTerm]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: Customer[];
      if (searchTerm.trim()) {
        data = await customerService.searchCustomers(searchTerm);
      } else {
        data = await customerService.getAllCustomers();
      }
      
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="loading">Loading customers...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={loadCustomers}>Retry</button>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <p>{searchTerm ? 'No customers found matching your search.' : 'No customers found. Create your first customer!'}</p>
      </div>
    );
  }

  return (
    <div className="customer-list">
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{formatDate(customer.registrationDate)}</td>
              <td className="actions">
                <button 
                  className="btn btn-view"
                  onClick={() => onViewCustomer(customer)}
                >
                  View
                </button>
                <button 
                  className="btn btn-edit"
                  onClick={() => onEditCustomer(customer)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => onDeleteCustomer(customer)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
