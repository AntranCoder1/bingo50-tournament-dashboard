import Redis from "ioredis";
import { ReJSON } from "redis-modules-sdk";
import { REDIS_CONFIG } from "./config";

let client: any;
const parentKey = "tournament";
export const redis = new Redis({
  port: REDIS_CONFIG.port, // Redis port
  host: REDIS_CONFIG.host, // Redis host
  password: REDIS_CONFIG.password,
});

export const redisJson = async () => {
  client = new ReJSON(REDIS_CONFIG);
  await client.connect();
};

export const getData = async (path: any) => {
  if (!client || !client.connected) {
    await redisJson(); // Connect to the Redis server with RedisJSON support if not already done
  }
  const data = await client.get(parentKey, path);
  return JSON.parse(data);
};

export const setData = async (path: any, data: any) => {
  return await client.set(parentKey, path, JSON.stringify(data));
};

export const checkData = async (path: any) => {
  return await client.type(parentKey, path);
};

export const numIncBy = async (path: any, num) => {
  return await client.numincrby(parentKey, num, path);
};

export const deleteData = async (path: any) => {
  return await client.del(parentKey, path);
};

export const arrappend = async (path: any, items: any) => {
  return await client.arrappend(parentKey, items, path);
};
