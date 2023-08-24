"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
class RedisStorage {
    setKeyExpiry(arg0, arg1) {
        throw new Error("Method not implemented.");
    }
    constructor() {
        this.client = new ioredis_1.Redis(this.getConfiguration());
    }
    /**
     * @description Fetch Configuration for Redis
     * @returns {RedisOptions}
     */
    getConfiguration() {
        const creds = {
            db: 0,
            host: 'localhost',
            port: 6379, // <number>config.get(Config.REDIS_PORT)
        };
        return creds;
    }
    /**
     * @description Set key in Redis
     * @param key
     * @param value
     * @returns
     */
    setKey(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.set(key, value);
            }
            catch (error) {
                console.log('Redis storage set', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Set key in redis with Expiry
     * @param key
     * @param value
     * @param seconds
     * @returns
     */
    setKeyWithExpiry(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.client.set(key, value);
                yield this.setExpiry(key, seconds);
                return data;
            }
            catch (error) {
                console.log('Redis storage set', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Get Value from Redis by key
     * @param key
     * @returns
     */
    getKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.get(key);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Set Expiry for a key in redis
     * @param key
     * @param seconds
     * @returns
     */
    setExpiry(key, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.expire(key, seconds);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Delete key from Redis
     * @param key
     * @returns
     */
    delKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.del(key);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Set Hash in Redis
     * @param hashName
     * @param key
     * @param value
     * @returns
     */
    setHash(hashName, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.hset(hashName, key, value);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Get value from redis hash by field/key name
     * @param hashName
     * @param key
     * @returns
     */
    getHash(hashName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.hget(hashName, key);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Update Field/Key value in Redis hash
     * @param hashName
     * @param key
     * @param field
     * @param value
     * @returns
     */
    updateHash(hashName, key, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.hset(hashName, key, field, value);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Set Hash in Redis with Expiry for a certain Field
     * @param hashName
     * @param key
     * @param value
     * @param seconds
     * @returns
     */
    setHashWithExpiry(hashName, key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.client.hset(hashName, key, value);
                yield this.setHashExpiry(hashName, key, seconds);
                return data;
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Set Expiry for Field inside Redis hash
     * @param hashName
     * @param key
     * @param seconds
     * @returns
     */
    setHashExpiry(hashName, key, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.expire(`${hashName}:${key}`, seconds);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Del Specific Field/Key from Redis Hash
     * @param hashName
     * @param key
     * @returns
     */
    delKeyFromHash(hashName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.hdel(hashName, key);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Insert data into list
     * @param key
     * @param data
     * @param ttl
     */
    insertInList(key, data, ttl = 3600) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = this.client.pipeline();
                const totalCount = data.length;
                for (let index = 0; index < totalCount; index++) {
                    data[index].totalCount = totalCount;
                    yield pipeline.rpush(key, JSON.stringify(data[index]));
                }
                pipeline.expire(key, ttl);
                yield pipeline.exec();
                return;
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
    /**
     * @description Read data from list
     * @param key
     * @param skip
     * @param limit
     */
    readList(key, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.lrange(key, skip, limit);
            }
            catch (error) {
                console.log('Redis storage insertKeyInRedis', error, false);
                throw error;
            }
        });
    }
}
exports.redis = new RedisStorage();
