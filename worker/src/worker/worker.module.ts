import { Module } from "@nestjs/common";
import { WorkerService } from "./worker.service";
import { KafkaModule } from "../kafka/kafka.module";
import { RedisModule } from "../redis/redis.module";
import { MongodbModule } from "../mongodb/mongodb.module";

@Module({
    imports: [KafkaModule, RedisModule, MongodbModule],
    providers: [WorkerService],
})
export class WorkerModule {}
