import { RedisLockCache } from "./cache";

export class LockManager {
  public static async acquireLock(key: string, expiry: number): Promise<boolean> {
    const res = await RedisLockCache.getCache().set('lock_' + key, "1", {PX: expiry, NX: true});
    if (res === "OK") {
      return true;
    }
    return false;
  }

  public static async releaseLock(key: string): Promise<boolean> {
    await RedisLockCache.getCache().del("lock_" + key);
    return true;
  }
}
