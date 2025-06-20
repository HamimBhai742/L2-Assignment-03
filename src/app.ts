import express, { Application } from 'express';
const app: Application = express();

app.get('/', (req, res) => {
  res.send('Wellcome to libray API');
});

export default app;