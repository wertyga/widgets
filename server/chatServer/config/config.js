export const config = {
  PORT: 5001,
  REDIS_PORT: 6379,
  serverName: process.env !== 'production' ? 'http://localhost:5001' : 'http://localhost:5001',
  adminOrigin: process.env !== 'production' ? 'http://localhost:3000' : 'http://localhost:3000',
};
