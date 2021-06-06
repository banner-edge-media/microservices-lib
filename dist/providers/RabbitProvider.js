"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jackrabbit = require("jackrabbit");
const util = require('util');
class RabbitProvider {
    static connect(connectionString) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    console.log(new Error("RabbitMQ Disconnected"));
                    process.exit(1);
                });
            });
        });
    }
    static connectConsumer(name, options, consumer, durable = true) {
        let consuming = false;
        this.queues[name] = this.exchange.queue({ name, durable });
        this.queues[name].consume(consumer, options);
        this.queues[name].on('ready', () => {
            console.log(name + " Q Ready");
        })
            .on('connected', function () {
            console.log(name + " Q Connected");
        }).on('consuming', function () {
            consuming = true;
            console.log(name + " Q Consuming");
        });
        setTimeout(function () {
            if (!consuming) {
                console.log(new Error(name + " Q NOT Consuming"));
                process.exit(1);
            }
        }, 20000);
    }
    static publish(name, message, awaitResponse = false) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.default = RabbitProvider;
RabbitProvider.queues = {};
//# sourceMappingURL=RabbitProvider.js.map