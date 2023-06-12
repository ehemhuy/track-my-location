import { Module } from "@nestjs/common";
import { WorkerService } from "./worker.service";
import { KafkaModule } from "../kafka/kafka.module";

@Module({
    imports: [KafkaModule],
    providers: [WorkerService],
})
export class WorkerModule {}
