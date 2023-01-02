import { RedisLockCache } from "./cache";

export class LockManager {
  public static async acquireLock(key: string, expiry: number): Promise<boolean> {
    const res = await RedisLockCache.getCache().sendCommand(["SET", "lock_" + key, "1", "EX", expiry.toString(), "NX"]);
    if (res === "OK") {
      return true;
    }
    return false;
  }
}
