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
const node_fetch_1 = require("node-fetch");
class AccessService {
    static remoteSelf(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        {
          self {
            id
            first
            last
            email
          }
        }
        `;
            const response = yield node_fetch_1.default(process.env.API_URL, {
                method: "POST",
                body: JSON.stringify({ query }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                }
            });
            if (response.status === 200) {
                const json = yield response.json();
                if (json.data && json.data.self) {
                    return json.data.self;
                }
            }
            return null;
        });
    }
}
exports.default = AccessService;
//# sourceMappingURL=AccessService.js.map