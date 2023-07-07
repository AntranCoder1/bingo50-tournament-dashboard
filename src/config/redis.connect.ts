import Redis from "ioredis";
import { ReJSON } from "redis-modules-sdk";
import { REDIS_CONFIG } from "./redis.config";

let client: any;
const parentKey = "table";
export const redis = new Redis(REDIS_CONFIG);

export const redisJson = async () => {
  client = new ReJSON(REDIS_CONFIG);
  await client.connect();
};

export const getData = async (path: any) => {
  const data = await client.get(parentKey, path);
  return await JSON.parse(data);
};

export const setData = async (path: any, data: any) => {
  await client.set(parentKey, path, JSON.stringify(data));
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

export const sendToStream = async (stream: string, event: any) => {
  await redis.xadd(
    stream,
    "*",
    "data",
    JSON.stringify(event)
  );
};
