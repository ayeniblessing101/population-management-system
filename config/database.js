import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Tells mongoose to use ES6
mongoose.Promise = global.Promise;

// connect to database and handle bad connection
export default mongoose.connect(process.env.DATABASE_URL, {
  useMongoClient: true,
});