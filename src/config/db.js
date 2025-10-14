// import mongoose from "mongoose";

// let cached = global.mongoose

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
// }

// async function connectDB () {
//     if (cached.conn) {
//         return cached.conn
//     }

//     if (!cached.conn) {
//         const opts = {
//             bufferCommands: false
//         }

//         cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/shoptech`, opts).then(mongoose => {
//             return mongoose
//         })
//     }

//     cached.conn = await cached.promise
//     return cached.conn
// }
// export default connectDB;


// config/db.js (or db.ts) - Corrected

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB () {
    // 1. Return cached connection if available
    if (cached.conn) {
        return cached.conn;
    }

    // 2. Wait for existing promise if available
    if (cached.promise) {
        // Just await the existing promise to ensure it's resolved/ready
        // The resolved value (mongoose instance) is stored in .conn in step 3.
        await cached.promise; 
        return cached.conn; 
    }

    // 3. Create a new connection promise
    const opts = {
        bufferCommands: false
    }

    cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/shoptech`, opts).then(mongooseInstance => {
        // On success, cache the instance
        cached.conn = mongooseInstance;
        return mongooseInstance;
    });
    
    // 4. Resolve the promise and return the connection instance
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;