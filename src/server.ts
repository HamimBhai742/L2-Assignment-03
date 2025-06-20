import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
const PORT = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://mongodb:mongodb742@cluster0.bls3tyg.mongodb.net/library-db?retryWrites=true&w=majority&appName=Cluster0'
    );

    server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
}
main()