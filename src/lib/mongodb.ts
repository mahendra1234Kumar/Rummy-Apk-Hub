import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables!");
  console.error("Please set MONGODB_URI in your .env.local file or production environment variables.");
  // Don't throw in production to prevent build failures, but log the error
  if (process.env.NODE_ENV === "development") {
    throw new Error("MONGODB_URI is not defined in .env file");
  }
}

/**
 * Global cache (important for Next.js hot reload)
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    console.error("❌ Cannot connect to MongoDB: MONGODB_URI is not defined");
    throw new Error("MongoDB connection string is not configured. Please set MONGODB_URI environment variable.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    }).catch((error) => {
      console.error("❌ MongoDB connection error:", error);
      cached.promise = null; // Reset promise on error
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on error
    throw error;
  }
}
