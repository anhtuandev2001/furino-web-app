import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import checkToken from './authentication/auth';
import connect from './database/database';

import { cartsRouter, categoriesRouter, productsRouter, usersRouter } from './routes/index';
import { relationship } from './models/relationship';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

relationship();

// Apply CORS middleware early in the middleware chain
const corsOptions = {
  origin: 'https://furino-pi.vercel.app',
  methods: ['PUT', 'GET', 'HEAD', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
};

app.use(cors(corsOptions));

// Other middleware
app.use(checkToken);
app.use(express.json());

app.options('/products', (req, res) => {
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, GET, HEAD, POST, DELETE, OPTIONS, PATCH'
  );
  res.status(200).end();
});

// Routes
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/carts', cartsRouter);
app.use('/users', usersRouter);

// Default route
app.get('/', (req, res) => {
  res.send('response from root router');
});

app.listen(port, async () => {
  await connect();
  console.log(`listening on port: ${port}`);
});
