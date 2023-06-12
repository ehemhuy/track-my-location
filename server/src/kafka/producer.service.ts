import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
    private producer: Producer;
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
