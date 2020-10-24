module.exports = {
  PORT: 5000,
  serverHost: process.env.NODE_ENV === 'production' ? 'http://localhost' : 'http://localhost',
};
