import mongoose from 'mongoose';
import envsConfig from './envs.config.js';
import { logger } from "../common/utils/logger.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(envsConfig.MONGO_URL);
        logger.info("MongoDB connected");
    } catch (error) {
        logger.error("MongoDB connection error:", error);
    }
};
