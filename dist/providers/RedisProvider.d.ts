export default class RedisProvider {
    static redis: any;
    private static getAsync;
    static connect(redisUri: string): void;
    static get(key: string): Promise<object>;
    static set(key: string, value: object, expireInMinutes: number): void;
}
