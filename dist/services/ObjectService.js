"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectService {
    static isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    static mergeDeep(target, ...sources) {
        if (!sources.length)
            return target;
        const source = sources.shift();
        if (ObjectService.isObject(target) && ObjectService.isObject(source)) {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    if (ObjectService.isObject(source[key])) {
                        if (!target[key])
                            Object.assign(target, { [key]: {} });
                        ObjectService.mergeDeep(target[key], source[key]);
                    }
                    else {
                        Object.assign(target, { [key]: source[key] });
                    }
                }
            }
        }
        return ObjectService.mergeDeep(target, ...sources);
    }
}
exports.default = ObjectService;
//# sourceMappingURL=ObjectService.js.map