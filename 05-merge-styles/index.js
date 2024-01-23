const fs = require('fs');
const path = require('path');

const bundle = [];
fs.readdir(
  path.resolve(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        const parsedFile = path.parse(
          path.resolve(__dirname, 'styles', file.name),
        );
        if (file.isFile() && parsedFile.ext === '.css') {
          fs.readFile(
            path.resolve(__dirname, 'styles', file.name),
            { encoding: 'utf-8' },
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                bundle.push(data);
              }
            },
          );
        }
      });
    }
  },
);
