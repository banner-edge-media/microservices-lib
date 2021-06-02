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
const pg_1 = require("pg");
class PostgresProvider {
    static connect(connectionString) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pool = new pg_1.Pool({
                connectionString,
                ssl: connectionString.includes("ondigitalocean") ? {
                    rejectUnauthorized: false
                } : undefined
            });
            yield this.pool.connect();
            console.log('Postgres connected');
        });
    }
    static query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.pool.query(sql, params);
            return results.rows;
        });
    }
}
exports.default = PostgresProvider;
//# sourceMappingURL=PostgresProvider.js.map