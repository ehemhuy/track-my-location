import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Collection, MongoClient, Document } from "mongodb";

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

    getCollection<TSchema extends Document = Document>(
        dbName: string,
        colName: string
    ): Collection<TSchema> {
        return this.mongoClient.db(dbName).collection<TSchema>(colName);
    }
}
