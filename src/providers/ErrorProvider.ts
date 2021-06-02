export default class ErrorProvider {
    static sendError(err: any, context?: any) {
        if (err.stack) {
            console.error(err);
        } else {
            console.error(new Error(JSON.stringify(err)));
        }
        if (context) {
            console.log(context);
        }
    }
}
