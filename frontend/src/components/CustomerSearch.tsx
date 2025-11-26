import React, { useState, useEffect } from 'react';
import './CustomerSearch.css';

interface CustomerSearchProps {
  onSearch: (searchTerm: string) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="customer-search">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search customers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-button"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerSearch;
