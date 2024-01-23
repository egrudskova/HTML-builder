const fs = require('fs').promises;
const path = require('path');
const { copyDir } = require('../04-copy-directory');
const { mergeStyles } = require('../05-merge-styles');

const buildPage = async () => {
  try {
    await copyDir(
      path.resolve(__dirname, 'assets'),
      path.resolve(__dirname, 'project-dist', 'assets'),
    );
    await mergeStyles(
      path.resolve(__dirname, 'styles'),
      path.resolve(__dirname, 'project-dist', 'style.css'),
    );
    const srcHtml = await fs.readFile(
      path.resolve(__dirname, 'template.html'),
      {
        encoding: 'utf-8',
      },
    );
    let distHtml = srcHtml;
    const components = await fs.readdir(path.resolve(__dirname, 'components'));
    for (let component of components) {
      const componentInnerHtml = await fs.readFile(
        path.resolve(__dirname, 'components', component),
        { encoding: 'utf-8' },
      );
      const componentName = path.parse(component).name;
      distHtml = distHtml.replace(
        new RegExp(`{{${componentName}}`, 'g'),
        componentInnerHtml,
      );
    }
    await fs.writeFile(
      path.resolve(__dirname, 'project-dist', 'index.html'),
      distHtml,
    );
  } catch (err) {
    console.log(err);
  }
};

buildPage();
