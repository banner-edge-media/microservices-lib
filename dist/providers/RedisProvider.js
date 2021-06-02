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
const Redis = require("redis");
const { promisify } = require("util");
class RedisProvider {
    static connect(redisUri) {
        this.redis = Redis.createClient(redisUri, { tls: redisUri.includes("ondigitalocean") });
        this.getAsync = promisify(this.redis.get).bind(this.redis);
    }
    static get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAsync(key);
            return result ? JSON.parse(result) : null;
        });
    }
    static set(key, value, expireInMinutes) {
        this.redis.set(key, JSON.stringify(value));
        this.redis.expire(key, expireInMinutes * 60);
    }
}
exports.default = RedisProvider;
//# sourceMappingURL=RedisProvider.js.map