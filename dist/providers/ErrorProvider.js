"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorProvider {
    static sendError(err, context) {
        if (err.stack) {
            console.error(err);
        }
        else {
            console.error(new Error(JSON.stringify(err)));
        }
        if (context) {
            console.log(context);
        }
    }
}
exports.default = ErrorProvider;
//# sourceMappingURL=ErrorProvider.js.map