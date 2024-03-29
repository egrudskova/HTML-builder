const path = require('path');
const fs = require('fs');

const readableStream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  { encoding: 'utf-8' },
);

let data = '';
readableStream.on('data', (chunk) => (data += chunk));
readableStream.on('end', () => console.log(data));
readableStream.on('error', (err) => console.log('Error: ', err.message));
