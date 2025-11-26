const Joi = require('joi');

const customerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().max(255).required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).required(),
  address: Joi.string().min(10).max(500).required()
});

const validateCustomer = (req, res, next) => {
  const { error } = customerSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: error.details.reduce((acc, detail) => {
          acc[detail.path[0]] = detail.message;
          return acc;
        }, {})
      }
    });
  }
  
  next();
};

module.exports = {
  validateCustomer
};
