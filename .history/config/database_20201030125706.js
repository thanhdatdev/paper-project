const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "",
    secretAccessKey: ""
});