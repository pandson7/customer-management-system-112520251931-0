import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class CustomerManagementStack112520251931 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB table for customers
    const customersTable = new dynamodb.Table(this, 'CustomersTable112520251931', {
      tableName: 'customers-112520251931',
      partitionKey: {
        name: 'customerId',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Enable auto scaling for read capacity
    customersTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    }).scaleOnUtilization({
      targetUtilizationPercent: 70,
    });

    // Enable auto scaling for write capacity
    customersTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    }).scaleOnUtilization({
      targetUtilizationPercent: 70,
    });

    // Global Secondary Index for email uniqueness checks
    customersTable.addGlobalSecondaryIndex({
      indexName: 'email-index-112520251931',
      partitionKey: {
        name: 'email',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 5,
      writeCapacity: 5,
    });

    // Output the table name
    new cdk.CfnOutput(this, 'CustomersTableName', {
      value: customersTable.tableName,
      description: 'DynamoDB table name for customers',
    });

    new cdk.CfnOutput(this, 'CustomersTableArn', {
      value: customersTable.tableArn,
      description: 'DynamoDB table ARN for customers',
    });
  }
}
