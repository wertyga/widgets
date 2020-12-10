import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  port: process.env.REDIS_PORT,
});

client.on('ready', () => console.log(`-- Redis ready on :${process.env.REDIS_PORT}`));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

export const getRedisKey = async (key) => {
  const value = await getAsync(key);

  return value && JSON.parse(value);
};
export const setRedisKey = async (key, value, expires) => {
  if (expires) {
    return setAsync(key, JSON.stringify(value), 'EX', 3600) // 1 hour expires;
  }
  return setAsync(key, JSON.stringify(value))
};
