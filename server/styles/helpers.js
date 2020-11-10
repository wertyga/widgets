import * as stylesDicts from "./styleDicts";

export const lightenDarkenColor = (col, amt) => {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col,16);

  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt
  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

const gradientHandle = (color, gradient) => {
  const direction = gradient.split('_')[1];
  return [
    'background',
    `linear-gradient(${direction}, ${color}, ${lightenDarkenColor(color, 70)})`,
  ];
};

const getSelectorProps = (service, styleKey, dbStyles) => {
  return Object.entries(stylesDicts[service][styleKey] || {})
    .map(([key, { selector, propName }]) => {
      const selectors = !(selector instanceof Array) ? [selector] : selector;
      const prop = !(propName instanceof Array) ? [propName] : propName;
      return selectors.reduce((init, next, i) => {
        const propValue = dbStyles[styleKey][key];

        let currentProp = prop[i];
        let currentValue = propValue;
        if (currentProp.indexOf('linear-gradient') !== -1) {
          const [gradientProp, gradientValue] = gradientHandle(propValue, currentProp);
          currentProp = gradientProp;
          currentValue = gradientValue;
        }

        return (
          `${init} ${next} { ${currentProp}: ${currentValue} !important; }`
        ).trim();
      }, '');
    })
    .join(' ');
};

export const getAddingStyles = (service, styles) => {
  const { styles: addingStyles } = styles.find(item => item.service === service) || {};
  if (!addingStyles || !stylesDicts[service]) return {};

  return Object.entries(addingStyles)
    .map(([key, propsObj]) => {
      return Object.entries(propsObj).reduce((init, next) => {
        const computedProp = getSelectorProps(service, key, addingStyles);
        return `${init} ${computedProp}`;
      }, '');
    })
    .join('');
};
