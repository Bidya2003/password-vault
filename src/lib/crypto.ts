import CryptoJS from "crypto-js";

const SECRET = process.env.NEXT_PUBLIC_CRYPTO_KEY!;

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET).toString();
};

export const decryptData = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};