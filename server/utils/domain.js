export const clearDomain = domain => domain
  .replace(/^\/|\/$/, '')
  .replace(/(http(s)?:\/\/)?(www\.)?/, '')
  .replace(/(:\d+)$/, '');

const domainSettingsSchema = {
  reviews: {
    enabled: false,
    preEdit: false,
  },
  support: {
    enabled: false,
  },
  chat: {
    enabled: false,
  },
};
