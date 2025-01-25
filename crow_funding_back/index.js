import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import AuthRouter from './routes/AuthRouter.js'
import CharityRouter from './routes/CharityRouter.js'
import WebHookRouter from './routes/webHookRouter.js'
import PaymentRouter from './routes/PaymentRouter.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10050mb' }));
app.use(express.urlencoded({ extended: true }));


app.use('/auth', AuthRouter)
app.use('/charity', CharityRouter)
app.use('/webhook',WebHookRouter)
app.use('/create_payment_intent',PaymentRouter)

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};
startServer();

