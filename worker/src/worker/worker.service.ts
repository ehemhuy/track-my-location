import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { EachMessagePayload } from "kafkajs";
import { TrackDTO } from "../dto/track.dto";
import { Location } from "../entities/location.entity";
import { ConsumerService } from "../kafka/consumer.service";
import { MongodbService } from "../mongodb/mongodb.service";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class WorkerService implements OnApplicationBootstrap {
    constructor(
        private kafkaConsumer: ConsumerService,
        private redisService: RedisService,
        private mongodbService: MongodbService
    ) {}

    onApplicationBootstrap() {
        const readMessage = async (
            payload: EachMessagePayload
        ): Promise<void> => {
            try {
                const trackDTO: TrackDTO = JSON.parse(
                    payload.message.value?.toString() || "{}"
                );
                const redisClient = this.redisService.getInstance();
                const l: Location = {
                    latitude: trackDTO.latitude,
                    longtitude: trackDTO.longtitude,
                };
                await Promise.all([
                    redisClient.LPUSH("locations", JSON.stringify(trackDTO)),
                    this.mongodbService
                        .getCollection<Location>("track", "location")
                        .insertOne(l),
                ]);
            } catch (error) {
                console.log(error);
            }
        };
        this.kafkaConsumer.readMessage("default_topic", readMessage);
    }
}
