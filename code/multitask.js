process.env.UV_THREADPOOL_SIZE = 9;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');

console.log('cp corse', os.cpus().length);

const start = Date.now();
console.log('start:', start);
function doRequest() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('request:', Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});
setImmediate(() => {
  console.log('setImmediate function');
});
setTimeout(() => {
  console.log('setTimeout function');

}, 0);
doHash(); // 1
doHash(); // 2
doHash(); // 3
doHash(); // 4
doHash(); // 5
doHash(); // 6
doHash(); // 7
doHash(); // 8
doHash(); // 9
