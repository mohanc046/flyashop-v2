const AWS = require("aws-sdk");

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIA2NYIXE5WYJ5WETLH",
  secretAccessKey: "YzG53ksXVpQoc2WqVj2eSzxCce/9kV5b+/4H3JZO",
  region: "us-east-2", // Your AWS region
});

const s3 = new AWS.S3();

const BUCKET_NAME = "flayashop";

module.exports = { s3, BUCKET_NAME };
