import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongoClient, Db } from "mongodb";

@Injectable()
export class MongodbService implements OnModuleInit, OnModuleDestroy {
    private mongoClient: MongoClient;
    constructor(private configService: ConfigService) {
        this.mongoClient = new MongoClient(
            this.configService.get<string>("MONGODB_URL") || ""
        );
    }

    async onModuleInit() {
        await this.mongoClient.connect();
        console.log("connected mongo");
    }

    async onModuleDestroy() {
        await this.mongoClient.close(true);
    }

    getInstance(dbName: string): Db {
        return this.mongoClient.db(dbName);
    }
}
