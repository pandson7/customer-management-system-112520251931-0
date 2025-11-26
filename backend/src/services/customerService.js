const { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
const { docClient, TABLE_NAME, EMAIL_INDEX } = require('../config/dynamodb');

class CustomerService {
  async createCustomer(customerData) {
    // Check if email already exists
    const existingCustomer = await this.findCustomerByEmail(customerData.email);
    if (existingCustomer) {
      throw new Error('EMAIL_EXISTS');
    }

    const customer = {
      customerId: uuidv4(),
      ...customerData,
      registrationDate: new Date().toISOString()
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: customer
    });

    await docClient.send(command);
    return customer;
  }

  async getAllCustomers() {
    const command = new ScanCommand({
      TableName: TABLE_NAME
    });

    const result = await docClient.send(command);
    return result.Items || [];
  }

  async getCustomerById(customerId) {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { customerId }
    });

    const result = await docClient.send(command);
    return result.Item;
  }

  async updateCustomer(customerId, updateData) {
    // Check if customer exists
    const existingCustomer = await this.getCustomerById(customerId);
    if (!existingCustomer) {
      throw new Error('CUSTOMER_NOT_FOUND');
    }

    // Check if email is being changed and if new email already exists
    if (updateData.email && updateData.email !== existingCustomer.email) {
      const emailExists = await this.findCustomerByEmail(updateData.email);
      if (emailExists) {
        throw new Error('EMAIL_EXISTS');
      }
    }

    const updateExpression = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(updateData).forEach((key, index) => {
      updateExpression.push(`#${key} = :val${index}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:val${index}`] = updateData[key];
    });

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { customerId },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });

    const result = await docClient.send(command);
    return result.Attributes;
  }

  async deleteCustomer(customerId) {
    // Check if customer exists
    const existingCustomer = await this.getCustomerById(customerId);
    if (!existingCustomer) {
      throw new Error('CUSTOMER_NOT_FOUND');
    }

    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { customerId }
    });

    await docClient.send(command);
    return true;
  }

  async findCustomerByEmail(email) {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: EMAIL_INDEX,
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    });

    const result = await docClient.send(command);
    return result.Items && result.Items.length > 0 ? result.Items[0] : null;
  }

  async searchCustomers(searchTerm) {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'contains(#name, :searchTerm) OR contains(email, :searchTerm)',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':searchTerm': searchTerm
      }
    });

    const result = await docClient.send(command);
    return result.Items || [];
  }
}

module.exports = new CustomerService();
