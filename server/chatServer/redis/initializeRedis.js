import redis from 'redis';
import { promisify } from 'util';
import { config } from '../config/config';

const client = redis.createClient({
  port: config.REDIS_PORT,
});

client.on('ready', () => console.log(`-- Redis ready on :${config.REDIS_PORT}`));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

export const getRedisKey = async (key) => {
  const value = await getAsync(key);

  return value && JSON.parse(value);
};
export const setRedisKey = async (key, value) => {
  return setAsync(key, JSON.stringify(value));
};
