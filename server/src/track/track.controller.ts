import { Body, Controller, Post, Get } from "@nestjs/common";
import { TrackDTO } from "../dto/track.dto";
import { TrackService } from "./track.service";

@Controller("track")
export class TrackController {
    constructor(private trackService: TrackService) {}
    @Post()
    async trackLocation(@Body() trackDTO: TrackDTO): Promise<void> {
        console.log(trackDTO);
        this.trackService.track(trackDTO);
    }

    @Get("/top10")
    async getTop10Location(): Promise<string[]> {
        return await this.trackService.getTop10();
    }
}
