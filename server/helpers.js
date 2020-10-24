import _isEmpty from 'lodash/isEmpty';
import { stylesDict } from './stylesDict';
import { gfServices } from './goldfish';

const getSelectorProps = (service, styleKey, dbStyles) => {
  return Object.entries(stylesDict[service][styleKey])
    .map(([key, { selector, propName }]) => {
      const selectors = !(selector instanceof Array) ? [selector] : selector;
      const prop = !(propName instanceof Array) ? [propName] : propName;
      return selectors.reduce((init, next, i) => {
        const propValue = dbStyles[styleKey][key];
        return (
          `${init} ${next} { ${prop[i]}: ${propValue} !important; }`
        ).trim();
      }, '');
    })
    .join(' ');
};

export const getAddingStyles = (service, styles) => {
  const { styles: addingStyles } = styles.find(item => item.service === service) || {};
  if (!addingStyles || !stylesDict[service]) return {};

  return Object.entries(addingStyles)
    .map(([key, propsObj]) => {
      return Object.entries(propsObj).reduce((init, next) => {
        const computedProp = getSelectorProps(service, key, addingStyles);
        return `${init} ${computedProp}`;
      }, '');
    })
    .join('')
    .replace(/\s/g, '');
};

export const getSrcs = (services, domain, lang, styles) => {
  const scripts = [];
  const css = [];
  const addingStyles = {};
  services.forEach(service => {
    const isDomainEnabled = domain.settings[service] && domain.settings[service].enabled;
    if (isDomainEnabled && domain.services.includes(service)) {
      const serverHost = `${process.env.SERVERHOST}:${process.env.PORT}`;
      const clearName = service.split('_')[0];
      css.push(`${serverHost}/${process.env[`CSS_${clearName.toUpperCase()}`]}`);
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

  return { scripts, css, addingStyles };
};
