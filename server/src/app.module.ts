import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { RedisModule } from "./redis/redis.module";
import { TrackModule } from "./track/track.module";
import { MongodbModule } from "./mongodb/mongodb.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TrackModule,
        KafkaModule,
        RedisModule,
        MongodbModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
