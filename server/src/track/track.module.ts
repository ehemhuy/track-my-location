import { Module } from "@nestjs/common";
import { KafkaModule } from "../kafka/kafka.module";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
    imports: [KafkaModule],
    controllers: [TrackController],
    providers: [TrackService],
})
export class TrackModule {}
