import { isPromise } from './utils';
import { LockManager } from "./LockManager";
import { ILock } from "./types";
import { getKey } from "./utils";

export function AcquireLock(value: ILock) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            const key = propertyKey + "_" + getKey(value.key, args);
            try {
                if(!await LockManager.acquireLock(key, value.ttl)) {
                    return null;
                }
                const response = originalMethod?.apply(this, args);
                await LockManager.releaseLock(key);
                return isPromise(response) ? await response : Promise.resolve(response);
            } catch (error) {
                await LockManager.releaseLock(key);
                throw error;
            }
        }
        return descriptor;
    }
}