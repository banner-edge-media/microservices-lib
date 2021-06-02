"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccessDeniedError extends Error {
    constructor() {
        super("Access Denied");
        this.accessDenied = true;
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }
}
exports.default = AccessDeniedError;
//# sourceMappingURL=AccessDeniedError.js.map