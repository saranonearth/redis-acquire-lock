import {AcquireLock, RedisLockCache} from '../src';
import * as redis from 'redis';

class Test {
    @AcquireLock({key: (args) => args[0] + "MX_W", ttl: 2000})
    public sampleFunction(userId: string, txType: string) {
        console.log('This is the main function');
    }
}

(async () => {
    const redisClient = redis.createClient({url: 'redis://127.0.0.1:6379'}) as any;
    await redisClient.connect();
    RedisLockCache.setCache(redisClient);
    const test = new Test();
    test.sampleFunction('ABXC', 'DEPOSIT');
    test.sampleFunction('ABC', 'DEPOSIT');
    test.sampleFunction('ABC!', 'DEPOSIT');
})();