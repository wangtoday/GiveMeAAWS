let AWS = require('aws-sdk');

let credentials = new AWS.SharedIniFileCredentials({ profile: 'mubaba' });

// 把本机上的密钥信息给予aws, 后面就可以进行基于该密钥信息所具有的权限进行操作了
AWS.config.credentials = credentials;

let s3 = new AWS.S3();

let s3Name = '';

// 异步获取bucket的列表, 然后取里面的文件就可以了
s3.listBuckets()
  .promise()
  .then(lists => {
    s3Name = lists.Buckets[0].Name;

    // console.log(s3Name);

    s3.getObject({
      Bucket: s3Name,
      Key: 'hello_mubaba.txt'
    })
      .promise()
      .then(sbject => {
        console.log('object inside this bucket', sbject);
      });
  })
  .catch(error => {
    console.log('error,', error);
  });
