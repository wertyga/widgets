const { config } = require('../server/config/config');
const path = require('path');

const widgetsEntries = config.languages.reduce((init, lang) => {
  const serviceEntries = Object.values(config.services).reduce((prev, service) => {
    const upperCaseServiceName = `${service.charAt(0).toUpperCase()}${service.slice(1)}`;
    const pathname = path.join(process.cwd(), `widgets/${upperCaseServiceName}/${upperCaseServiceName}_${lang}.js`);
    return { ...prev, [`${service}_${lang}`]: pathname };
  }, {});

  return { ...init, ...serviceEntries };
}, {});

module.exports = {
  widgetsEntries,
};
