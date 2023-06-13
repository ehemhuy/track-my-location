import { Injectable } from "@nestjs/common";
import { TrackDTO } from "../dto/track.dto";
import { ProducerService } from "../kafka/producer.service";
import { RedisService } from "../redis/redis.service";
import { MongodbService } from "../mongodb/mongodb.service";

@Injectable()
export class TrackService {
    constructor(
        private kafkaProducer: ProducerService,
        private redisService: RedisService,
        private mongdbService: MongodbService
    ) {}

    async track(trackDTO: TrackDTO): Promise<void> {
        const redisClient = this.redisService.getInstance();
        await Promise.all([
            redisClient.LPUSH("locations", JSON.stringify(trackDTO)),
            this.kafkaProducer.sendMessage(JSON.stringify(trackDTO)),
            this.mongdbService
                .getInstance("track")
                .collection("location")
                .insertOne(trackDTO),
        ]);
    }

    async getTop10(): Promise<string[]> {
        const redisClient = this.redisService.getInstance();
        return await redisClient.LRANGE("locations", 0, 9);
    }
}
