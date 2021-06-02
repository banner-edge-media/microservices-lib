export default class FriendlyError extends Error {
    isFriendly: boolean;
    field?: string;
    tag?: string;
    constructor(message: string, field?: string, tag?: string);
}
