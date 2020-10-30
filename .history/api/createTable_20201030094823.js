require("../config/database");
const AWS = require('aws-sdk');

let dynamodb = new AWS.DynamoDB();

let params = {
    TableName: "Papers",
    KeySchema: [
        { AttributeName: "name_paper", KeyType: "HASH" },
        { AttributeName: "ISBN", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "name_paper", AttributeType: "S" },
        { AttributeName: "ISBN", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error(`Something went wrong ${JSON.stringify(err,null,2)}`);
    } else {
        console.log(`Created table ${JSON.stringify(data, null, 2)}`);
    }
});