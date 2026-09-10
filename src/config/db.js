import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (cached.promise) {
    await cached.promise;
    return cached.conn;
  }

  const opts = {
    bufferCommands: false,
    dbName: "shoptech",
  };

  cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongooseInstance) => {
    cached.conn = mongooseInstance;
    return mongooseInstance;
  });

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;