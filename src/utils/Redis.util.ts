import {
  checkData,
  deleteData,
  getData,
  sendToStream,
  setData
} from "../config/redis.connect";

export const saveTable = async (table: any) => {
  return await setData(`id${table.id}`, table);
};

export const updateTableInitBots = async (tableId: any, bots: number) => {
  return await setData(`id${tableId}.numberOfBots`, bots);
};

export const updateTableStatus = async (tableId: any, status: string) => {
  return await setData(`id${tableId}.status`, status);
};

export const getTableRedis = async (tableId: any) => {
  return await getData(`id${tableId}`);
};

export const getAllTable = async () => {
  return await getData(`.`);
};

export const deleteAllTables = async () => {
  return await setData(`.`, {});
};

export const deleteTable = async (table: any) => {
  return await deleteData(`id${table.id}`);
};

export const checkExistTable = async (tableId: string) => {
  return await checkData(`id${tableId}`);
};

export const sendToLobbyStream = async (eventData: any) => {
  return await sendToStream("lobby-in", eventData);
};
