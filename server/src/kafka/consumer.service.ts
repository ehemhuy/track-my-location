import {
    Injectable,
    OnApplicationShutdown,
    OnModuleInit,
} from "@nestjs/common";

@Injectable()
export class ConsumerService implements OnModuleInit, OnApplicationShutdown {
    onApplicationShutdown(signal?: string | undefined) {
        // throw new Error("Method not implemented.");
    }
    onModuleInit() {
        // throw new Error("Method not implemented.");
    }
}
