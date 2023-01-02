import { RedisClientType } from "redis";

export interface ILock {
    key: KeyType;
    ttl: number;
}
export interface ICache {
    setCache: (client: RedisClientType<any, any>) => void;
    getCache: () => RedisClientType<any, any> | undefined;
}
export type KeyType = number[] | {(args: any[]): string} | string;