import mongoose from "mongoose";
import dotenv from 'dotenv';
import dns from 'node:dns';

dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;