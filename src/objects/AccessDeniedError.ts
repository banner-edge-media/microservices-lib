export default class AccessDeniedError extends Error {
    public accessDenied: boolean = true;
    constructor() {
        super("Access Denied");
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }
}
