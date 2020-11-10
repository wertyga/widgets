import _isEmpty from 'lodash/isEmpty';
import { getAddingStyles } from './styles/helpers';
import { gfServices } from './goldfish';

export const getSrcs = (services, domain, lang, styles) => {
  const serverHost = `${process.env.SERVERHOST}:${process.env.PORT}`;
  const scripts = [];
  const css = [{ href: `${serverHost}/css/common.css`, service: 'common' }];
  const addingStyles = {};

  services.forEach(service => {
    const isDomainEnabled = domain.settings[service] && domain.settings[service].enabled;
    if (isDomainEnabled && domain.services.includes(service)) {
      const clearName = service.split('_')[0];

      css.push({
        href: `${serverHost}/${process.env[`CSS_${clearName.toUpperCase()}`]}`,
        service,
      });
      scripts.push({
        filename: `${serverHost}/${process.env[`JS_${service.toUpperCase()}_${lang.toUpperCase()}`]}`,
        type: gfServices.servicesMeta[service].type,
      });

      const gottedAddingStyles = getAddingStyles(service, styles);
      if (!_isEmpty(gottedAddingStyles)){
        addingStyles[service] = gottedAddingStyles;
      }
    }
  });

  return { scripts, css, addingStyles, settings: domain.settings };
};
