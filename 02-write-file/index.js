const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));
stdout.write('Hi, User. Insert your input\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(data.toString().trim());
});

output.on('error', (err) => console.log('Error', err.message));
process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () => stdout.write('Goodbye'));
