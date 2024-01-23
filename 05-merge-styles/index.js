const fs = require('fs').promises;
const path = require('path');

const mergeStyles = async (dirPath, outputPath) => {
  try {
    const files = await fs.readdir(dirPath);
    const promises = files.map(async (file) => {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isFile() && path.extname(filePath) === '.css') {
        return fs.readFile(filePath, { encoding: 'utf-8' });
      }
    });
    const results = await Promise.all(promises);
    const bundle = results.join('\n');
    await fs.writeFile(outputPath, bundle, { encoding: 'utf-8' });
  } catch (err) {
    console.log(err);
  }
};

mergeStyles(
  path.resolve(__dirname, 'styles'),
  path.resolve(__dirname, 'project-dist', 'bundle.css'),
);

module.exports = { mergeStyles };
