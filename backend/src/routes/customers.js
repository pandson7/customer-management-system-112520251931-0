const express = require('express');
const customerService = require('../services/customerService');
const { validateCustomer } = require('../middleware/validation');

const router = express.Router();

// Get all customers or search customers
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    
    let customers;
    if (search) {
      customers = await customerService.searchCustomers(search);
    } else {
      customers = await customerService.getAllCustomers();
    }
    
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch customers'
      }
    });
  }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({
        error: {
          code: 'CUSTOMER_NOT_FOUND',
          message: 'Customer not found'
        }
      });
    }
    
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch customer'
      }
    });
  }
});

// Create new customer
router.post('/', validateCustomer, async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(409).json({
        error: {
          code: 'EMAIL_EXISTS',
          message: 'Email address is already in use',
          details: {
            email: 'Email address is already in use'
          }
        }
      });
    }
    
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create customer'
      }
    });
  }
});

// Update customer
router.put('/:id', validateCustomer, async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    
    if (error.message === 'CUSTOMER_NOT_FOUND') {
      return res.status(404).json({
        error: {
          code: 'CUSTOMER_NOT_FOUND',
          message: 'Customer not found'
        }
      });
    }
    
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(409).json({
        error: {
          code: 'EMAIL_EXISTS',
          message: 'Email address is already in use',
          details: {
            email: 'Email address is already in use'
          }
        }
      });
    }
    
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update customer'
      }
    });
  }
});

// Delete customer
router.delete('/:id', async (req, res) => {
  try {
    await customerService.deleteCustomer(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    
    if (error.message === 'CUSTOMER_NOT_FOUND') {
      return res.status(404).json({
        error: {
          code: 'CUSTOMER_NOT_FOUND',
          message: 'Customer not found'
        }
      });
    }
    
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to delete customer'
      }
    });
  }
});

module.exports = router;
