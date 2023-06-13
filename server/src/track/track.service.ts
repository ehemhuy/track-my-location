import { Injectable } from "@nestjs/common";
import { TrackDTO } from "../dto/track.dto";
import { ProducerService } from "../kafka/producer.service";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class TrackService {
    constructor(
        private kafkaProducer: ProducerService,
        private redisService: RedisService
    ) {}

    async track(trackDTO: TrackDTO): Promise<void> {
        await Promise.all([
            this.kafkaProducer.sendMessage(JSON.stringify(trackDTO)),
        ]);
    }

    async getTop10(): Promise<string[]> {
        const redisClient = this.redisService.getInstance();
        return await redisClient.LRANGE("locations", 0, 9);
    }
}
