import { Injectable } from "@nestjs/common";
import { TrackDTO } from "../dto/track.dto";
import { ProducerService } from "../kafka/producer.service";
import { RedisService } from "../redis/redis.service";
import { MongodbService } from "../mongodb/mongodb.service";
import { Location } from "../entities/location.entity";

@Injectable()
export class TrackService {
    constructor(
        private kafkaProducer: ProducerService,
        private redisService: RedisService,
        private mongdbService: MongodbService
    ) {}

    async track(trackDTO: TrackDTO): Promise<void> {
        const redisClient = this.redisService.getInstance();
        const l: Location = {
            latitude: trackDTO.latitude,
            longtitude: trackDTO.longtitude,
        };
        await Promise.all([
            redisClient.LPUSH("locations", JSON.stringify(trackDTO)),
            this.kafkaProducer.sendMessage(JSON.stringify(trackDTO)),
            this.mongdbService
                .getCollection<Location>("track", "location")
                .insertOne(l),
        ]);
    }

    async getTop10(): Promise<string[]> {
        const redisClient = this.redisService.getInstance();
        return await redisClient.LRANGE("locations", 0, 9);
    }
}
