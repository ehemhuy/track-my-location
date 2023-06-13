import { Module } from "@nestjs/common";
import { KafkaModule } from "../kafka/kafka.module";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { RedisModule } from "../redis/redis.module";
import { MongodbModule } from "../mongodb/mongodb.module";

@Module({
    imports: [KafkaModule, RedisModule, MongodbModule],
    controllers: [TrackController],
    providers: [TrackService],
})
export class TrackModule {}
