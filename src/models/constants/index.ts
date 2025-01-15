import document from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    imageUrl: string;
    userId: string;
}