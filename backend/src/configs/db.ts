import mongoose from "mongoose";

async function connectToMongo() {
    try {
        const uri = process.env.MONGODB_URI as string;
        if (!uri) {
            throw new Error("MongoDB URI is not provided in environment variables");
        }
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToMongo;
