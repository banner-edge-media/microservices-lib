import * as Redis from 'redis';
const { promisify } = require("util");


export default class RedisProvider {
    static redis;
    private static getAsync;
    static connect(redisUri: string) {
        this.redis = Redis.createClient(redisUri, {
            tls: {
                rejectUnauthorized: false
            }
        });
        this.getAsync = promisify(this.redis.get).bind(this.redis);
    }

    static async get(key: string): Promise<object> {
        const result = await this.getAsync(key);
        return result ? JSON.parse(result): null;
    }

    static set(key: string, value: object, expireInMinutes: number) {
        this.redis.set(key, JSON.stringify(value));
        this.redis.expire(key, expireInMinutes * 60);
    }
}
