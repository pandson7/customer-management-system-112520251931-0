const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'customers-112520251931';
const EMAIL_INDEX = 'email-index-112520251931';

module.exports = {
  docClient,
  TABLE_NAME,
  EMAIL_INDEX
};
