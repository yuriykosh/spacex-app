import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.MONGODB_URI; // Ensure this is correctly set
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDb;
