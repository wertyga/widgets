export const getSrcs = (ids, domain, lang) => {
  const scripts = [];
  const clearNames = [];
  
  ids.forEach(id => {
    const isDomainEnabled = !!domain.settings[id] && domain.settings[id].enabled;
    if (isDomainEnabled && domain.services.includes(id)) {
      clearNames.push(id);
      scripts.push(`${process.env[`JS_${id.toUpperCase()}_${lang.toUpperCase()}`]}`);
    }
  });
  
  return { scripts, clearNames };
};
