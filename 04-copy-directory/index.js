const fs = require('fs').promises;
const path = require('path');

async function copyDir(pathFolder, pathCopyFolder) {
  try {
    const pathCopyFolderStats = await fs.stat(pathCopyFolder).catch(() => null);

    if (pathCopyFolderStats) {
      await fs.rm(pathCopyFolder, { recursive: true });
    }

    await fs.mkdir(pathCopyFolder, { recursive: true });
    const files = await fs.readdir(pathFolder);

    for (const file of files) {
      const pathFile = path.resolve(pathFolder, file);
      const pathCopyFile = path.resolve(pathCopyFolder, file);

      const stats = await fs.stat(pathFile);

      if (stats.isFile()) {
        await fs.copyFile(pathFile, pathCopyFile);
      } else if (stats.isDirectory()) {
        await copyDir(pathFile, pathCopyFile);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

copyDir(
  path.resolve(__dirname, 'files'),
  path.resolve(__dirname, 'files-copy'),
);

module.exports = { copyDir };
