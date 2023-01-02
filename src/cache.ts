import {RedisClientType} from 'redis';
import { ICache } from "./types";

class Cache implements ICache {
  private static cacheClient: RedisClientType<any, any>;

  public setCache(client: RedisClientType<any, any>): void {
    Cache.cacheClient = client;
  }

  public getCache(): RedisClientType<any, any> {
    return Cache.cacheClient;
  }
}
export const RedisLockCache = new Cache();
