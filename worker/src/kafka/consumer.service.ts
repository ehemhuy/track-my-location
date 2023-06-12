import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Consumer, EachMessageHandler, Kafka } from "kafkajs";
import * as fs from "fs";
import * as path from "path";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
    private consumer: Consumer;
    private kafkaServer: Kafka;

    constructor(private configService: ConfigService) {
        this.kafkaServer = new Kafka({
            clientId: "my-app",
            brokers: [this.configService.get<string>("KAFKA_BROKER") || ""],
            connectionTimeout: 10_000,
            authenticationTimeout: 10_000,
            ssl: {
                // cert: "",
                ca: this.configService.get<string>("KAFKA_SSL_CA") || "",
            },
            sasl: {
                username:
                    this.configService.get<string>("KAFKA_SASL_USERNAME") || "",
                password:
                    this.configService.get<string>("KAFKA_SASL_PASSWORD") || "",
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
