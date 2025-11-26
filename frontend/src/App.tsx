import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import CustomerSearch from './components/CustomerSearch';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import Notification from './components/Notification';
import customerService, { Customer } from './services/customerService';
import './App.css';

type View = 'list' | 'create' | 'edit' | 'details';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

function App() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView('details');
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView('edit');
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setCustomerToDelete(customer);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;

    try {
      setDeleteLoading(true);
      await customerService.deleteCustomer(customerToDelete.customerId);
      setShowDeleteDialog(false);
      setCustomerToDelete(null);
      setCurrentView('list');
      showNotification('Customer deleted successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete customer';
      showNotification(errorMessage, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setCustomerToDelete(null);
  };

  const handleSaveCustomer = (customer: Customer) => {
    const isEdit = currentView === 'edit';
    showNotification(
      `Customer ${isEdit ? 'updated' : 'created'} successfully`,
      'success'
    );
    setCurrentView('list');
    setSelectedCustomer(null);
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setSelectedCustomer(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCustomer(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return (
          <CustomerForm
            onSave={handleSaveCustomer}
            onCancel={handleCancelForm}
          />
        );
      
      case 'edit':
        return (
          <CustomerForm
            customer={selectedCustomer!}
            onSave={handleSaveCustomer}
            onCancel={handleCancelForm}
          />
        );
      
      case 'details':
        return (
          <CustomerDetails
            customer={selectedCustomer!}
            onEdit={() => setCurrentView('edit')}
            onDelete={() => handleDeleteCustomer(selectedCustomer!)}
            onBack={handleBackToList}
          />
        );
      
      default:
        return (
          <>
            <div className="list-header">
              <div className="search-section">
                <CustomerSearch onSearch={handleSearch} />
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentView('create')}
              >
                Add New Customer
              </button>
            </div>
            <CustomerList
              onViewCustomer={handleViewCustomer}
              onEditCustomer={handleEditCustomer}
              onDeleteCustomer={handleDeleteCustomer}
              searchTerm={searchTerm}
            />
          </>
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Customer Management System</h1>
      </header>
      
      <main className="app-main">
        {renderCurrentView()}
      </main>

      {showDeleteDialog && customerToDelete && (
        <DeleteConfirmDialog
          customer={customerToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          loading={deleteLoading}
        />
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  );
}

export default App;
