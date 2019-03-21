import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Tells mongoose to use ES6
mongoose.Promise = global.Promise;

// let mongooseConnection;

// connect to database and handle bad connection
// if (process.env.NODE_ENV !== 'test') {
//   mongooseConnection = mongoose.connect(process.env.DATABASE_URL, {
//     useMongoClient: true,
//   });
// } else {
//   mongooseConnection = mongoose.connect(process.env.DATABASE_TEST_URL, {
//     useMongoClient: true,
//   });
// }

export default mongoose.connect(process.env.DATABASE_TEST_URL, {
  useMongoClient: true,
});
