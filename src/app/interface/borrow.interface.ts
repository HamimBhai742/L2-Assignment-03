import mongoose, { Model } from 'mongoose';

export interface IBorrow {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}


