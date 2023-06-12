import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TrackModule } from './track/track.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [TrackModule, KafkaModule],
})
export class AppModule {}
