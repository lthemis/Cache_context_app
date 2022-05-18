import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import taskRouter from './routes/router';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
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
