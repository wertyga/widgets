const PORT = 5000;
const IO_SERVER_PORT = 5001;

module.exports = {
  PORT,
  SERVER_HOST: process.env.NODE_ENV !== 'production'
    ? `http://localhost:${PORT}`
    : `https://api.w-widgets.tech`,
  IO_SERVER_PORT,
  REDIS_PORT: 6379,
  IO_SERVER_NAME: process.env.NODE_ENV !== 'production'
    ? `http://localhost:${IO_SERVER_PORT}`
    : `https://ws.w-widgets.tech`,
  API_GATEWAY: process.env.NODE_ENV !== 'production'
    ? `http://localhost:${PORT}/api`
    : `https://api.w-widgets.tech/api`,
};
