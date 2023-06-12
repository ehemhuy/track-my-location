import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { WorkerModule } from "./worker/worker.module";

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [KafkaModule, WorkerModule],
})
export class AppModule {}
