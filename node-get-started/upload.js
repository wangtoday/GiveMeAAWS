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

// 设置一个入口
const distFolderPath = path.join(__dirname, config.folderPath);

readMe(distFolderPath, '');

function readMe(folder_path, subFolder_path) {
  //   console.log(`start from the root '${folder_path}' , '${subFolder_path}'`);
  // 因为设定的是从文件夹读取, 所以内部肯定是一个循环先
  fs.readdir(folder_path, (err, files) => {
    for (let index = 0; index < files.length; index++) {
      let fileItem = files[index];
      //   console.log(fileItem);
      const filePath = path.join(folder_path, fileItem);
      if (fs.lstatSync(filePath).isDirectory()) {
        console.log('it is a folder');
        // subFolder_path = subFolder_path + '/' + fileItem;
        let key = '';
        if (subFolder_path.length > 0) {
          key = subFolder_path + '/' + fileItem;
        } else {
          key = fileItem;
        }

        readMe(filePath, key);
        // continue;
      } else {
        // 如果是一个文件, 就上传好了
        if (index == 1) {
          console.log(files[1]);
          //   console.log(ext);
        }
        fs.readFile(filePath, (error, fileContent) => {
          // if unable to read file contents, throw exception
          if (error) {
            console.log('has a error : ', error);
            throw error;
          }
          let key = '';
          if (subFolder_path.length > 0) {
            key = subFolder_path + '/' + fileItem;
          } else {
            key = fileItem;
          }

          // let hh = ext;
          myContentType = exports.ext.getContentType(exports.ext.getExt(key));
          // upload file to S3
          s3.putObject(
            {
              Bucket: config.s3,
              // Prefix:files[index],
              Key: key,
              Body: fileContent,
              //   Metadata: {
              //     'Content-Type': 'text/html'
              // }
              ContentType: myContentType
            },
            res => {
              console.log(`Successfully uploaded   --->'${fileItem}'!`);
            }
          );
        });
      }
    }
  });
}

// fs.readdir(distFolderPath, (err, files) => {
//   //   return;
//   if (err) {
//     console.log(err);
//   }
//   //   console.log(files);
//   for (let index = 0; index < files.length; index++) {
//     const filePath = path.join(distFolderPath, files[index]);

//     // console.log(filePath);
//     // ignore if directory
//     if (fs.lstatSync(filePath).isDirectory()) {
//       console.log(filePath, 'is a folder');
//       let newPath = filePath;
//       fs.readdir(newPath, (error, withFiles) => {
//         console.log('so inside the new path', newPath, withFiles);
//         for (let fileNumber = 0; fileNumber < withFiles.length; fileNumber++) {
//           const fileNewPath = path.join(newPath, withFiles[fileNumber]);
//           console.log('upload the new file', fileNewPath);
//           if (fs.lstatSync(fileNewPath).isDirectory) {
//             continue;
//           }
//           fs.readFile(fileNewPath, (error, fileContent) => {
//             // if unable to read file contents, throw exception
//             if (error) {
//               console.log('has a error : ', error);
//               throw error;
//             }

//             // upload file to S3
//             s3.putObject(
//               {
//                 Bucket: config.s3,
//                 // Prefix:files[index],
//                 Key: files[index] + '/' + withFiles[fileNumber],
//                 Body: fileContent
//               },
//               res => {
//                 console.log(
//                   `Successfully uploaded   --->'${withFiles[fileNumber]}'!`
//                 );
//               }
//             );
//           });
//         }
//       });

//       continue;
//     }

//     // read file contents
//     fs.readFile(filePath, (error, fileContent) => {
//       // if unable to read file contents, throw exception
//       if (error) {
//         throw error;
//       }

//       // upload file to S3
//       s3.putObject(
//         {
//           Bucket: config.s3,
//           Key: files[index],
//           Body: fileContent
//         },
//         res => {
//           console.log(`Successfully uploaded '${files[index]}'!`);
//         }
//       );
//     });
//   }
// });

exports.ext = (function() {
  var extTypes = {
    '3gp': 'video/3gpp',
    a: 'application/octet-stream',
    ai: 'application/postscript',
    aif: 'audio/x-aiff',
    aiff: 'audio/x-aiff',
    asc: 'application/pgp-signature',
    asf: 'video/x-ms-asf',
    asm: 'text/x-asm',
    asx: 'video/x-ms-asf',
    atom: 'application/atom+xml',
    au: 'audio/basic',
    avi: 'video/x-msvideo',
    bat: 'application/x-msdownload',
    bin: 'application/octet-stream',
    bmp: 'image/bmp',
    bz2: 'application/x-bzip2',
    c: 'text/x-c',
    cab: 'application/vnd.ms-cab-compressed',
    cc: 'text/x-c',
    chm: 'application/vnd.ms-htmlhelp',
    class: 'application/octet-stream',
    com: 'application/x-msdownload',
    conf: 'text/plain',
    cpp: 'text/x-c',
    crt: 'application/x-x509-ca-cert',
    css: 'text/css',
    csv: 'text/csv',
    cxx: 'text/x-c',
    deb: 'application/x-debian-package',
    der: 'application/x-x509-ca-cert',
    diff: 'text/x-diff',
    djv: 'image/vnd.djvu',
    djvu: 'image/vnd.djvu',
    dll: 'application/x-msdownload',
    dmg: 'application/octet-stream',
    doc: 'application/msword',
    dot: 'application/msword',
    dtd: 'application/xml-dtd',
    dvi: 'application/x-dvi',
    ear: 'application/java-archive',
    eml: 'message/rfc822',
    eps: 'application/postscript',
    exe: 'application/x-msdownload',
    f: 'text/x-fortran',
    f77: 'text/x-fortran',
    f90: 'text/x-fortran',
    flv: 'video/x-flv',
    for: 'text/x-fortran',
    gem: 'application/octet-stream',
    gemspec: 'text/x-script.ruby',
    gif: 'image/gif',
    gz: 'application/x-gzip',
    h: 'text/x-c',
    hh: 'text/x-c',
    htm: 'text/html',
    html: 'text/html',
    ico: 'image/vnd.microsoft.icon',
    ics: 'text/calendar',
    ifb: 'text/calendar',
    iso: 'application/octet-stream',
    jar: 'application/java-archive',
    java: 'text/x-java-source',
    jnlp: 'application/x-java-jnlp-file',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'application/javascript',
    json: 'application/json',
    log: 'text/plain',
    m3u: 'audio/x-mpegurl',
    m4v: 'video/mp4',
    man: 'text/troff',
    mathml: 'application/mathml+xml',
    mbox: 'application/mbox',
    mdoc: 'text/troff',
    me: 'text/troff',
    mid: 'audio/midi',
    midi: 'audio/midi',
    mime: 'message/rfc822',
    mml: 'application/mathml+xml',
    mng: 'video/x-mng',
    mov: 'video/quicktime',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    mp4v: 'video/mp4',
    mpeg: 'video/mpeg',
    mpg: 'video/mpeg',
    ms: 'text/troff',
    msi: 'application/x-msdownload',
    odp: 'application/vnd.oasis.opendocument.presentation',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    odt: 'application/vnd.oasis.opendocument.text',
    ogg: 'application/ogg',
    p: 'text/x-pascal',
    pas: 'text/x-pascal',
    pbm: 'image/x-portable-bitmap',
    pdf: 'application/pdf',
    pem: 'application/x-x509-ca-cert',
    pgm: 'image/x-portable-graymap',
    pgp: 'application/pgp-encrypted',
    pkg: 'application/octet-stream',
    pl: 'text/x-script.perl',
    pm: 'text/x-script.perl-module',
    png: 'image/png',
    pnm: 'image/x-portable-anymap',
    ppm: 'image/x-portable-pixmap',
    pps: 'application/vnd.ms-powerpoint',
    ppt: 'application/vnd.ms-powerpoint',
    ps: 'application/postscript',
    psd: 'image/vnd.adobe.photoshop',
    py: 'text/x-script.python',
    qt: 'video/quicktime',
    ra: 'audio/x-pn-realaudio',
    rake: 'text/x-script.ruby',
    ram: 'audio/x-pn-realaudio',
    rar: 'application/x-rar-compressed',
    rb: 'text/x-script.ruby',
    rdf: 'application/rdf+xml',
    roff: 'text/troff',
    rpm: 'application/x-redhat-package-manager',
    rss: 'application/rss+xml',
    rtf: 'application/rtf',
    ru: 'text/x-script.ruby',
    s: 'text/x-asm',
    sgm: 'text/sgml',
    sgml: 'text/sgml',
    sh: 'application/x-sh',
    sig: 'application/pgp-signature',
    snd: 'audio/basic',
    so: 'application/octet-stream',
    svg: 'image/svg+xml',
    svgz: 'image/svg+xml',
    swf: 'application/x-shockwave-flash',
    t: 'text/troff',
    tar: 'application/x-tar',
    tbz: 'application/x-bzip-compressed-tar',
    tcl: 'application/x-tcl',
    tex: 'application/x-tex',
    texi: 'application/x-texinfo',
    texinfo: 'application/x-texinfo',
    text: 'text/plain',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    torrent: 'application/x-bittorrent',
    tr: 'text/troff',
    txt: 'text/plain',
    vcf: 'text/x-vcard',
    vcs: 'text/x-vcalendar',
    vrml: 'model/vrml',
    war: 'application/java-archive',
    wav: 'audio/x-wav',
    wma: 'audio/x-ms-wma',
    wmv: 'video/x-ms-wmv',
    wmx: 'video/x-ms-wmx',
    wrl: 'model/vrml',
    wsdl: 'application/wsdl+xml',
    xbm: 'image/x-xbitmap',
    xhtml: 'application/xhtml+xml',
    xls: 'application/vnd.ms-excel',
    xml: 'application/xml',
    xpm: 'image/x-xpixmap',
    xsl: 'application/xml',
    xslt: 'application/xslt+xml',
    yaml: 'text/yaml',
    yml: 'text/yaml',
    zip: 'application/zip'
  };
  return {
    getExt: function(path) {
      var i = path.lastIndexOf('.');
      return i < 0 ? '' : path.substr(i + 1);
    },
    getContentType: function(ext) {
      console.log(ext);
      return extTypes[ext.toLowerCase()] || 'application/octet-stream';
    }
  };
})();
