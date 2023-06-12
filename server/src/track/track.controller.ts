import { Body, Controller, Post } from "@nestjs/common";
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
}
