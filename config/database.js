import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Tells mongoose to use ES6
mongoose.Promise = global.Promise;

export default mongoose.connect(process.env.DATABASE_TEST_URL, {
  useMongoClient: true,
});
