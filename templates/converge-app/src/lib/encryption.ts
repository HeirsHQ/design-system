import CryptoJS from "crypto-js";

const encSecret = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET || "";
if (!encSecret) {
  throw new Error("NEXT_PUBLIC_ENCRYPTION_SECRET environment variable is required but was not set.");
}

const IV_HEX_LENGTH = 32;

export class DataEncryption {
  private readonly key: CryptoJS.lib.WordArray;

  constructor() {
    this.key = CryptoJS.SHA256(encSecret);
  }

  encrypt<T extends object>(data: T): string {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return iv.toString(CryptoJS.enc.Hex) + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }

  decrypt<T extends object>(hexString: string): T {
    const iv = CryptoJS.enc.Hex.parse(hexString.slice(0, IV_HEX_LENGTH));
    const ciphertext = CryptoJS.enc.Hex.parse(hexString.slice(IV_HEX_LENGTH));

    const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });
    const bytes = CryptoJS.AES.decrypt(cipherParams, this.key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
  }
}

export const dataEncryption = new DataEncryption();
