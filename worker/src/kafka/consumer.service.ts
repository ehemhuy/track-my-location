import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Consumer, EachMessageHandler, Kafka } from "kafkajs";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
    private consumer: Consumer;
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
        this.consumer = this.kafkaServer.consumer({
            groupId: "groupId",
        });
    }
    onModuleDestroy() {
        this.consumer.disconnect();
    }

    async onModuleInit() {
        await this.consumer.connect();
        console.log("comsume data from kafka");
    }

    async readMessage(topic: string, eachMessage: EachMessageHandler) {
        await this.consumer.subscribe({ topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage,
        });
    }
}
