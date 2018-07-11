let AWS = require('aws-sdk');
let fs = require('fs');
let path = require('path');

AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: 'mubaba'
});

const config = {
  s3: 'mubaba-node-sdk-create-sample-2018',
  folderPath: './dist'
};

let s3 = new AWS.S3();

// s3.upload({
//     Bucket:
// })

// s3.getObject({
//   Bucket: 'mubaba-node-sdk-create-sample-2018',
//   Key: 'hello_mubaba.txt'
// })
//   .promise()
//   .then(value => {
//     console.log('what content do I have in my bucket: ', value);
//   });

// fs.readFile('demo.pdf', (err, data) => {
//   if (err) {
//     console.log('has error', err);
//   }
//   console.log(data);
//   s3.putObject({
//     Bucket: 'mubaba-node-sdk-create-sample-2018',
//     Key: 'hello_m.pdf',
//     Body: data
//   })
//     .promise()
//     .then(value => {
//       console.log('diao');
//     });
// });

const distFolderPath = path.join(__dirname, config.folderPath);
fs.readdir(distFolderPath, (err, files) => {
  if (err) {
    console.log(err);
  }
  //   console.log(files);
  for (let index = 0; index < files.length; index++) {
    const filePath = path.join(distFolderPath, files[index]);

    // console.log(filePath);
    // ignore if directory
    if (fs.lstatSync(filePath).isDirectory()) {
      console.log(filePath, 'is a folder');
      let newPath = filePath;
      fs.readdir(newPath, (error, withFiles) => {
        console.log('so inside the new path', newPath, withFiles);
        for (let fileNumber = 0; fileNumber < withFiles.length; fileNumber++) {
          const fileNewPath = path.join(newPath, withFiles[fileNumber]);
          console.log('upload the new file', fileNewPath);
          if (fs.lstatSync(fileNewPath).isDirectory) {
            continue;
          }
          fs.readFile(fileNewPath, (error, fileContent) => {
            // if unable to read file contents, throw exception
            if (error) {
              console.log('has a error : ', error);
              throw error;
            }

            // upload file to S3
            s3.putObject(
              {
                Bucket: config.s3,
                // Prefix:files[index],
                Key: files[index] + '/' + withFiles[fileNumber],
                Body: fileContent
              },
              res => {
                console.log(
                  `Successfully uploaded   --->'${withFiles[fileNumber]}'!`
                );
              }
            );
          });
        }
      });

      continue;
    }

    // read file contents
    fs.readFile(filePath, (error, fileContent) => {
      // if unable to read file contents, throw exception
      if (error) {
        throw error;
      }

      // upload file to S3
      s3.putObject(
        {
          Bucket: config.s3,
          Key: files[index],
          Body: fileContent
        },
        res => {
          console.log(`Successfully uploaded '${files[index]}'!`);
        }
      );
    });
  }
});
