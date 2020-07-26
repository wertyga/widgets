const fs = require('fs');
const path = require('path');
const { config } = require('../server/config/config');

const getContent = (upperCaseServiceName, serviceName, lang) => (`import { render } from 'react-dom';
import { ${upperCaseServiceName}Form } from './${upperCaseServiceName}Form/${upperCaseServiceName}Form';
import { User } from '../../utils/user';

import '../styles.css';
  
const user = new User('${serviceName}');
render(
  <${upperCaseServiceName}Form lang="${lang}" user={user} />, 
  document.querySelector('[w-data="${serviceName}"]'),
);
`);

const widgetsEntries = config.languages.reduce((init, lang) => {
  const serviceEntries = Object.values(config.services).map((service) => {
    const upperCaseServiceName = `${service.charAt(0).toUpperCase()}${service.slice(1)}`;
    const pathname = path.join(process.cwd(), `widgets/${upperCaseServiceName}/${upperCaseServiceName}_${lang}.js`);
    const entryContent = getContent(upperCaseServiceName, service, lang);

    return { pathname, entryContent };
  });

  return [...init, ...serviceEntries];
}, []);

widgetsEntries.forEach(({ pathname, entryContent }) => {
  fs.writeFileSync(pathname, entryContent)
});
