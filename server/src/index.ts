import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import taskRouter from './routes/router';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const corsConfig = {
  origin: 'http://localhost:3002',
};

app.use(cors(corsConfig));
app.use(express.json());
app.use('/', taskRouter);
app.use('*', (req, res) => res.sendStatus(404));

async function start() {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
  try {
    await connectDB();
    console.log('Connectio to the DB established');
  } catch (err) {
    console.log('Unable to connect to the database', err);
  }
}

start();
