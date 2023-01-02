# redis-acquire-lock
Straight forward typescript decorator for distributed locking using redis⚡

### Using function parameter as key
```ts
class UserService {
    @AcquireLock({key: (args) => args[0] + "MX_W", ttl: 2000})
    public createTransaction(userId: string, txType: string) {
        console.log('Function Logic');
    }
}
```
### Using string as key
```ts
class UserService {
    @AcquireLock({key: "some_key", ttl: 2000})
    public createTransaction(userId: string, txType: string) {
        console.log('Function Logic');
    }
}
```

### Using function parameter by index
```ts
class UserService {
    @AcquireLock({key: [1], ttl: 2000})
    public createTransaction(userId: string, txType: string) {
        console.log('Function Logic');
    }
}
```
