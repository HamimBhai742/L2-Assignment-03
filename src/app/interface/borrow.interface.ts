import mongoose, { Model } from 'mongoose';
import { IBook } from './book.interface';

export interface IBorrow {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}


