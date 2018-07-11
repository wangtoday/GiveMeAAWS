let AWS = require('aws-sdk');
let uuid = require('uuid');
let moment = require('moment');

// set the credentials
var credentials = new AWS.SharedIniFileCredentials({ profile: 'mubaba' });
AWS.config.credentials = credentials;

// create a unique bucket name, will be display in the s3 bucket
let bucketName = 'mubaba-node-sdk-sample' + uuid.v4();

bucketName = 'mubaba-node-sdk-create-sample-2018';
console.log('show the bucket Name', bucketName);
// however, 我改变注意, 不论运行多少次我这个文件, 我只要生成一个 demo 的bucket
// 后面的这个promise, 如果已经存在了这个bucket 也不会报错, 会接着运行

// create name for upload object key
let keyName = 'hello_mubaba.txt';

let bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' })
  .createBucket({ Bucket: bucketName })
  .promise();

// handle promise, means we resolve the promise and do some job after then
bucketPromise
  .then(data => {
    console.log('I can say I create a bucket there');
    // create the key file and put into the bucket
    let objectParams = {
      Bucket: bucketName,
      Key: keyName,
      Body:
        'Hello World! create time: ' +
        moment(Date.now()).format('MM/DD/YYYY , h:mm:ss a')
    };
    // Create object upload promise
    let uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' })
      .putObject(objectParams)
      .promise();
    uploadPromise.then(data => {
      console.log(
        'Successfully uploaded data to ' + bucketName + '/' + keyName
      );
    });
  })
  .catch(error => {
    console.log('error occurs', error);
  });
