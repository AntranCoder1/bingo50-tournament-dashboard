import * as CryptoJS from "crypto-js";
import { Md5 } from "ts-md5/dist/md5";

const hash = (plain: string) => {
  const md5 = new Md5();
  md5.appendStr(plain);
  return md5.end();
};

export let encryptPassword = (password: string) => {
  const hashPassword = hash(password);
  return hashPassword;
};

export let comparePassword = (hashPassword: string, password: string) => {
  const toCompareHashPassword = hash(password);
  return hashPassword === toCompareHashPassword;
};

export let encrypt = async (actualText) => {
  const encrypted = CryptoJS.AES.encrypt(
    actualText,
    process.env.ENCRYPTION_KEY
  ).toString();
  return encrypted;
};

export let decrypt = async (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.ENCRYPTION_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
