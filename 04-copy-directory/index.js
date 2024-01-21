const fs = require('fs');
const path = require('path');

const copyDir = (sourceDir, destDir) => {
  fs.mkdir(path.resolve(__dirname, destDir), { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });

  fs.readdir(path.resolve(__dirname, destDir), (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.unlink(path.resolve(__dirname, destDir, file), (err) =>
          console.log(err),
        );
      });
    }
  });

  fs.readdir(path.resolve(__dirname, sourceDir), (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.copyFile(
          path.resolve(__dirname, sourceDir, file),
          path.resolve(__dirname, destDir, file),
          (err) => {
            if (err) {
              console.log(err);
            }
          },
        );
      });
    }
  });
};

copyDir('files', 'files-copy');
