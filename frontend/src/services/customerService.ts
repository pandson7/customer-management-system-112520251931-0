export interface Customer {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
}

export interface CreateCustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

class CustomerService {
  async getAllCustomers(): Promise<Customer[]> {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return response.json();
  }

  async getCustomerById(id: string): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Customer not found');
      }
      throw new Error('Failed to fetch customer');
    }
    return response.json();
  }

  async createCustomer(customerData: CreateCustomerData): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to create customer');
    }
    return response.json();
  }

  async updateCustomer(id: string, customerData: CreateCustomerData): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to update customer');
    }
    return response.json();
  }

  async deleteCustomer(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to delete customer');
    }
  }

  async searchCustomers(searchTerm: string): Promise<Customer[]> {
    const response = await fetch(`${API_BASE_URL}/customers?search=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to search customers');
    }
    return response.json();
  }
}

export default new CustomerService();
