import { Inject, Injectable } from "@nestjs/common";
import { ProducerService } from "../kafka/producer.service";
import { TrackDTO } from "../dto/track.dto";

@Injectable()
export class TrackService {
    constructor(private kafkaProducer: ProducerService) {}

    async track(trackDTO: TrackDTO): Promise<void> {
        await this.kafkaProducer.sendMessage(JSON.stringify(trackDTO));
    }
}
