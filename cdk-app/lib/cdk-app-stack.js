"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerManagementStack112520251931 = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const dynamodb = __importStar(require("aws-cdk-lib/aws-dynamodb"));
class CustomerManagementStack112520251931 extends cdk.Stack {
    constructor(scope, id, props) {
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
exports.CustomerManagementStack112520251931 = CustomerManagementStack112520251931;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLWFwcC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNkay1hcHAtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLG1FQUFxRDtBQUdyRCxNQUFhLG1DQUFvQyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2hFLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsK0JBQStCO1FBQy9CLE1BQU0sY0FBYyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLEVBQUU7WUFDNUUsU0FBUyxFQUFFLHdCQUF3QjtZQUNuQyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDcEM7WUFDRCxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXO1lBQzdDLFlBQVksRUFBRSxDQUFDO1lBQ2YsYUFBYSxFQUFFLENBQUM7WUFDaEIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztTQUN6QyxDQUFDLENBQUM7UUFFSCx3Q0FBd0M7UUFDeEMsY0FBYyxDQUFDLHFCQUFxQixDQUFDO1lBQ25DLFdBQVcsRUFBRSxDQUFDO1lBQ2QsV0FBVyxFQUFFLEVBQUU7U0FDaEIsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1lBQ3BCLHdCQUF3QixFQUFFLEVBQUU7U0FDN0IsQ0FBQyxDQUFDO1FBRUgseUNBQXlDO1FBQ3pDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQztZQUNwQyxXQUFXLEVBQUUsQ0FBQztZQUNkLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUNwQix3QkFBd0IsRUFBRSxFQUFFO1NBQzdCLENBQUMsQ0FBQztRQUVILHFEQUFxRDtRQUNyRCxjQUFjLENBQUMsdUJBQXVCLENBQUM7WUFDckMsU0FBUyxFQUFFLDBCQUEwQjtZQUNyQyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLE9BQU87Z0JBQ2IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUNwQztZQUNELFlBQVksRUFBRSxDQUFDO1lBQ2YsYUFBYSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCO1FBQ3hCLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDNUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxTQUFTO1lBQy9CLFdBQVcsRUFBRSxtQ0FBbUM7U0FDakQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUMzQyxLQUFLLEVBQUUsY0FBYyxDQUFDLFFBQVE7WUFDOUIsV0FBVyxFQUFFLGtDQUFrQztTQUNoRCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2REQsa0ZBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTWFuYWdlbWVudFN0YWNrMTEyNTIwMjUxOTMxIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gRHluYW1vREIgdGFibGUgZm9yIGN1c3RvbWVyc1xuICAgIGNvbnN0IGN1c3RvbWVyc1RhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdDdXN0b21lcnNUYWJsZTExMjUyMDI1MTkzMScsIHtcbiAgICAgIHRhYmxlTmFtZTogJ2N1c3RvbWVycy0xMTI1MjAyNTE5MzEnLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICdjdXN0b21lcklkJyxcbiAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgICB9LFxuICAgICAgYmlsbGluZ01vZGU6IGR5bmFtb2RiLkJpbGxpbmdNb2RlLlBST1ZJU0lPTkVELFxuICAgICAgcmVhZENhcGFjaXR5OiA1LFxuICAgICAgd3JpdGVDYXBhY2l0eTogNSxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgfSk7XG5cbiAgICAvLyBFbmFibGUgYXV0byBzY2FsaW5nIGZvciByZWFkIGNhcGFjaXR5XG4gICAgY3VzdG9tZXJzVGFibGUuYXV0b1NjYWxlUmVhZENhcGFjaXR5KHtcbiAgICAgIG1pbkNhcGFjaXR5OiAxLFxuICAgICAgbWF4Q2FwYWNpdHk6IDEwLFxuICAgIH0pLnNjYWxlT25VdGlsaXphdGlvbih7XG4gICAgICB0YXJnZXRVdGlsaXphdGlvblBlcmNlbnQ6IDcwLFxuICAgIH0pO1xuXG4gICAgLy8gRW5hYmxlIGF1dG8gc2NhbGluZyBmb3Igd3JpdGUgY2FwYWNpdHlcbiAgICBjdXN0b21lcnNUYWJsZS5hdXRvU2NhbGVXcml0ZUNhcGFjaXR5KHtcbiAgICAgIG1pbkNhcGFjaXR5OiAxLFxuICAgICAgbWF4Q2FwYWNpdHk6IDEwLFxuICAgIH0pLnNjYWxlT25VdGlsaXphdGlvbih7XG4gICAgICB0YXJnZXRVdGlsaXphdGlvblBlcmNlbnQ6IDcwLFxuICAgIH0pO1xuXG4gICAgLy8gR2xvYmFsIFNlY29uZGFyeSBJbmRleCBmb3IgZW1haWwgdW5pcXVlbmVzcyBjaGVja3NcbiAgICBjdXN0b21lcnNUYWJsZS5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdlbWFpbC1pbmRleC0xMTI1MjAyNTE5MzEnLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICdlbWFpbCcsXG4gICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIHJlYWRDYXBhY2l0eTogNSxcbiAgICAgIHdyaXRlQ2FwYWNpdHk6IDUsXG4gICAgfSk7XG5cbiAgICAvLyBPdXRwdXQgdGhlIHRhYmxlIG5hbWVcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnQ3VzdG9tZXJzVGFibGVOYW1lJywge1xuICAgICAgdmFsdWU6IGN1c3RvbWVyc1RhYmxlLnRhYmxlTmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRHluYW1vREIgdGFibGUgbmFtZSBmb3IgY3VzdG9tZXJzJyxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdDdXN0b21lcnNUYWJsZUFybicsIHtcbiAgICAgIHZhbHVlOiBjdXN0b21lcnNUYWJsZS50YWJsZUFybixcbiAgICAgIGRlc2NyaXB0aW9uOiAnRHluYW1vREIgdGFibGUgQVJOIGZvciBjdXN0b21lcnMnLFxuICAgIH0pO1xuICB9XG59XG4iXX0=