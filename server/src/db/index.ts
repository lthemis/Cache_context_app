import Mongoose from 'mongoose';
import dotenv from 'dotenv';

const DB_MONGO_HOST = process.env.DB_MONGO_HOST;

Mongoose.connection.on('error', function (err) {
  console.log('DB error after initial connection', err);
});

Mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

export function connectDB() {
  return DB_MONGO_HOST && Mongoose.connect(DB_MONGO_HOST);
}
