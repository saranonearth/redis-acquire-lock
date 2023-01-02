import { LockManager } from "./LockManager";
import { ILock } from "./types";
import { getKey } from "./utils";

export function AcquireLock(value: ILock) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {
            const key = propertyKey + "_" + getKey(value.key, args);
            if(!await LockManager.acquireLock(key, value.ttl)) {
                return null;
            }
            return originalMethod?.apply(this, args);
        }
        return descriptor;
    }
}