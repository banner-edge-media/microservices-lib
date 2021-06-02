export default class ObjectService {
    public static isObject(item: any) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    public static mergeDeep(target: any, ...sources: any): any {
        if (!sources.length) return target;
        const source = sources.shift();

        if (ObjectService.isObject(target) && ObjectService.isObject(source)) {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    if (ObjectService.isObject(source[key])) {
                        if (!target[key]) Object.assign(target, {[key]: {}});
                        ObjectService.mergeDeep(target[key], source[key]);
                    } else {
                        Object.assign(target, {[key]: source[key]});
                    }
                }
            }
        }

        return ObjectService.mergeDeep(target, ...sources);
    }
}
