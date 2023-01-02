import { KeyType } from "./types";

export function getKey(keyValue: KeyType, args: any[]): string {
  let key = "";

  if (typeof keyValue === "object" && Array.isArray(keyValue)) {
    args.forEach((value, index) => {
      if (keyValue.indexOf(index) !== -1) {
        key += value + "_";
      }
    });
    return key;
  }

  if (typeof keyValue === "string") {
    key = keyValue;
    return key;
  }

  if (typeof keyValue === "function") {
    return keyValue(args);
  }
  throw new Error("@AcquireLock - invalid key type");
}

export function isPromise(object: any): object is Promise<any> {
    return object && Promise.resolve(object) === object;
  }
