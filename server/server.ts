import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import checkToken from './authentication/auth';
import connect from './database/database';

import {
  cartsRouter,
  categoriesRouter,
  notificationRouter,
  orderRouter,
  productsRouter,
  usersRouter,
} from './routes/index';
import { relationship } from './models/relationship';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

relationship();

app.use(cors());

// Other middleware
app.use(checkToken);
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/carts', cartsRouter);
app.use('/users', usersRouter);
app.use('/orders', orderRouter);
app.use('/notifications', notificationRouter);

app.options('/products', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'PUT, GET, HEAD, POST, DELETE, OPTIONS, PATCH');
  res.status(200).end();
});

// Default route
app.get('/', (req, res) => {
  res.send('response from root router');
});

app.listen(port, async () => {
  await connect();
  console.log(`listening on port: ${port}`);
});
