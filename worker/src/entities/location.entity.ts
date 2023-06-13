import { Document } from "mongodb";

export interface Location extends Document {
    _id?: any;
    longtitude: number;
    latitude: number;
}
