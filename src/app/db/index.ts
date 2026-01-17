import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.DB_URL as string);
    console.log(
      `MongoDB connection successful.\nHost: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(
      `Database failed to connect. \n1) Please check your internet connect. Or \n2)Check your mongoDB Url on .env file`
    );
    // if database connection failed server will stop runnig
    process.exit(1);
  }
};
