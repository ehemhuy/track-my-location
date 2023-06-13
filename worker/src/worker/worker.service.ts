import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "../kafka/consumer.service";
import { EachMessagePayload } from "kafkajs";
import { RedisService } from "../redis/redis.service";
import { MongodbService } from "../mongodb/mongodb.service";
import { TrackDTO } from "../dto/track.dto";
import { Location } from "../entities/location.entity";

@Injectable()
export class WorkerService {
    constructor(
        private kafkaConsumer: ConsumerService,
        private redisService: RedisService,
        private mongodbService: MongodbService
    ) {
        this.kafkaConsumer.readMessage(
            "default_topic",
            async (payload: EachMessagePayload): Promise<void> => {
                try {
                    const trackDTO: TrackDTO = JSON.parse(
                        payload.message.value?.toString() || "{}"
                    );
                    console.log(this.redisService);
                    const redisClient = this.redisService.getInstance();
                    const l: Location = {
                        latitude: trackDTO.latitude,
                        longtitude: trackDTO.longtitude,
                    };
                    await Promise.all([
                        redisClient.LPUSH(
                            "locations",
                            JSON.stringify(trackDTO)
                        ),
                        this.mongodbService
                            .getCollection<Location>("track", "location")
                            .insertOne(l),
                    ]);
                } catch (error) {
                    console.log(error);
                }
            }
        );
    }
}
