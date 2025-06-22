import express, { Application } from 'express';
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
const app: Application = express();
app.use(express.json());

//book router
app.use('/api/books', bookRouter);

//borrow router
app.use('/api/borrow', borrowRouter);

//running server
app.get('/', (req, res) => {
  res.send('Wellcome to library Management API');
});


export default app;