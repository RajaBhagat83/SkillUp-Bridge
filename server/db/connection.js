 const mongoose = require("mongoose");

//  const url =process.env.DATABASE_URL;
// mongoose.connect(url,{
//   useNewUrlParser:true,
//   useUnifiedTopology:true
// }).then(() => console.log("Connected to db")).catch((e)=>console.log("error",e));


const MONGO_URL =process.env.DATABASE_URL;
if (!MONGO_URL) throw new Error("MONGO_URL not defined");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

 async function connectToMongoDb() {
  if (cached.conn) {
    if (mongoose.connection.readyState === 1) {
      return cached.conn;
    }
    // If not connected, clear cache and reconnect
    cached.promise = null;
    cached.conn = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
module.exports = connectToMongoDb;