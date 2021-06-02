"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FriendlyError extends Error {
    constructor(message, field, tag) {
        super(message);
        this.isFriendly = true;
        this.field = field;
        this.tag = tag;
        Object.setPrototypeOf(this, FriendlyError.prototype);
    }
}
exports.default = FriendlyError;
//# sourceMappingURL=FriendlyError.js.map