const PORT = 5000;
const IO_SERVER_PORT = 5001;

module.exports = {
  PORT,
  SERVER_HOST: process.env.NODE_ENV !== 'production' ? `http://localhost:${PORT}` : `http://134.209.126.140:${PORT}`,
  IO_SERVER_PORT,
  REDIS_PORT: 6379,
  IO_SERVER_NAME: process.env.NODE_ENV !== 'production' ? `http://localhost:${IO_SERVER_PORT}` : `http://134.209.126.140:${IO_SERVER_PORT}`,
  API_GATEWAY: process.env.NODE_ENV !== 'production' ? `http://localhost:${PORT}/api` : `http://134.209.126.140:${PORT}/api`,
};
