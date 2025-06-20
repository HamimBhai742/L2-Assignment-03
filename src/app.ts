import express, { Application } from 'express';
import { bookRouter } from './app/controllers/book.controllers';
const app: Application = express();
app.use(express.json());

//book router
app.use('/api/books', bookRouter);

//running server
app.get('/', (req, res) => {
  res.send('Wellcome to libray API');
});

export default app;