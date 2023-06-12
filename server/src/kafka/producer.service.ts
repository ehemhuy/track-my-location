import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
    private producer: Producer;
    private kafkaServer: Kafka;

    constructor() {
        this.kafkaServer = new Kafka({
            clientId: "my-app",
            brokers: ["kafka-37e4304b-ehemhuy-93c3.aivencloud.com:14010"],
            connectionTimeout: 10_000,
            authenticationTimeout: 10_000,
            ssl: {
                // cert: "",
                ca: fs.readFileSync(path.join(process.cwd(), "./ca.pem")),
            },
            sasl: {
                username: "avnadmin",
                password: "AVNS_VvAZIoJ1L8xJNRWElQE",
                mechanism: "plain",
            },
        });
        this.producer = this.kafkaServer.producer();
    }

    async onModuleInit() {
        await this.producer.connect();
        console.log("producer connected kafka");
    }

    async onModuleDestroy() {
        await this.producer.disconnect();
    }

    async sendMessage(
        msg: string,
        topic: string = "default_topic"
    ): Promise<string> {
        await this.producer.send({
            topic: topic,
            messages: [
                {
                    value: msg,
                    key: "key",
                },
            ],
        });
        return msg;
    }
}
