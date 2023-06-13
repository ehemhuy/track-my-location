import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { WorkerModule } from "./worker/worker.module";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./redis/redis.module";
import { MongodbModule } from "./mongodb/mongodb.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        KafkaModule,
        RedisModule,
        MongodbModule,
        WorkerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
