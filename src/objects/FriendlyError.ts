export default class FriendlyError extends Error {
    public isFriendly: boolean = true;
    public field?: string;
    public tag?: string;
    constructor(message: string, field?: string, tag?: string) {
        super(message);
        this.field = field;
        this.tag = tag;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FriendlyError.prototype);
    }
}
