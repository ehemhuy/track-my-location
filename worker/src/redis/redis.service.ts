import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private redisClient: RedisClientType;

    constructor(private configService: ConfigService) {
        this.redisClient = createClient({
            url: this.configService.get<string>("REDIS_URL") || "",
        });
    }

    async onModuleInit() {
        await this.redisClient.connect();
        console.log("connected redis");
    }

    async onModuleDestroy() {
        await this.redisClient.disconnect();
    }

    getInstance(): RedisClientType {
        return this.redisClient;
    }

    async redisLrange(
        key: string,
        start: number = 0,
        stop: number = 9
    ): Promise<string[]> {
        return await this.redisClient.LRANGE(key, start, stop);
    }
}
