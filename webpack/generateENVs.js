const fs = require('fs');
const path = require('path');
const envs = require('../server/config/envs');
const { config } = require('../server/config/config');

const collectEnvsContent = (cssFileNames, jsFileNames) => {
  const initEnvs = Object.entries(envs).reduce((init, [key, value]) => (`${init}
${key.toUpperCase()}=${value}
    `), '');

  const jsENvs = jsFileNames.reduce((init, js) => {
    const clearName = (js.match(/_(\w+)\.js/) || ['', ''])[1];
    return `${init}
JS_${clearName.toUpperCase()}=${js}
    `;
  }, '');

  return Object.values(config.services).reduce((init, service) => {
    const cssPath = cssFileNames.find(css => css.indexOf(service) !== -1);
    return (`${init}
CSS_${service.toUpperCase()}=${cssPath}
    `);
  }, `${initEnvs}\n${jsENvs}`);
};

const generateHashEnv = (cssFileNames, jsFileNames) => {
  try {
    const envContent = collectEnvsContent(cssFileNames, jsFileNames);
    const envFilePath = path.join(process.cwd(), '.env');
    fs.writeFileSync(envFilePath, envContent);
  } catch (e) {
    console.error(e);
  }
};

class GenerateHashEnv {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'Generate env',
      (compilation, callback) => {
        const cssFileNames = Object.keys(compilation.assets).filter(item => item.indexOf('.css') !== -1) || [];
        const jsFileNames = Object.keys(compilation.assets).filter(item => item.indexOf('.js') !== -1) || [];

        generateHashEnv(cssFileNames, jsFileNames);

        callback();
      }
    );
  }
}

module.exports = GenerateHashEnv;
