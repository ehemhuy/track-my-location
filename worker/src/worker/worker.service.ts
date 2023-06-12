import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "../kafka/consumer.service";
import { EachMessagePayload } from "kafkajs";

@Injectable()
export class WorkerService implements OnModuleInit {
    constructor(private kafkaConsumer: ConsumerService) {}

    onModuleInit() {
        this.kafkaConsumer.readMessage("default_topic", this.readMessage);
    }

    async readMessage(payload: EachMessagePayload): Promise<void> {
        console.log(JSON.parse(payload.message.value?.toString() || "{}"));
    }
}
