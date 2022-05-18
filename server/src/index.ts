import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('*', (req, res) => res.sendStatus(404));

async function start() {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

start();
