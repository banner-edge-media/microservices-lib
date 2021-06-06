import * as jackrabbit from 'jackrabbit';
const util = require('util');

export default class RabbitProvider {

    static connection;
    static exchange;
    static queues: any = {};

    static async connect(connectionString: string) {
        return new Promise(resolve => {
            this.connection = jackrabbit(connectionString)
                .on('connected', () => {
                    this.exchange = this.connection.default();
                    resolve(true);
                    console.log('RabbitMQ connected');
                })
                .on('error', function (err) {
                    console.error(new Error(err));
                    process.exit(1);
                })
                .on('disconnected', function () {
                    console.log(new Error("RabbitMQ Disconnected"))
                    process.exit(1);
                })
        });
    }

    static connectConsumer(name: string, options, consumer: Function, durable: boolean = true) {
        let consuming = false;
        this.queues[name] = this.exchange.queue({name, durable})
        this.queues[name].consume(consumer, options);
        this.queues[name].on('ready', () => {
            console.log(name + " Q Ready");
        })
        .on('connected', function() {
            console.log(name + " Q Connected");
        }).on('consuming', function() {
            consuming = true;
            console.log(name + " Q Consuming");
        });

        setTimeout(function() {
            if (!consuming) {
                console.log(new Error(name + " Q NOT Consuming"));
                process.exit(1);
            }
        }, 20000)
    }

    static async publish(name: string, message: any, awaitResponse: boolean = false) {
        return new Promise((resolve, reject) => {
            this.exchange.publish(message, {
                key: name,
                reply: (data) => {
                    if (awaitResponse) {
                        resolve(data);
                    }
                }
            });
            resolve(true);
        });
    }
}
