export default class RabbitProvider {
    static connection: any;
    static exchange: any;
    static queues: any;
    static connect(connectionString: string): Promise<unknown>;
    static connectConsumer(name: string, options: any, consumer: Function, durable?: boolean): void;
    static publish(name: string, message: any, awaitResponse?: boolean): Promise<unknown>;
}
