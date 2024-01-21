const path = require('path');
const fs = require('fs');

const showStats = (file) => {
  fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
    if (err) {
      console.log(err);
    } else {
      const parsedFile = path.parse(file.name);
      console.log(
        `${parsedFile.name} - ${parsedFile.ext.slice(1)} - ${
          stats.size / 1000
        }kb`,
      );
    }
  });
};

fs.readdir(
  path.resolve(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        if (file.isFile()) {
          showStats(file);
        }
      });
    }
  },
);
