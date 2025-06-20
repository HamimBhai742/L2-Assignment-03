import { model, Schema } from 'mongoose';
import { IBook } from '../interface/book.interface';

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: {
        values: [
          'FICTION',
          'NON_FICTION',
          'SCIENCE',
          'HISTORY',
          'BIOGRAPHY',
          'FANTASY',
        ],
        message: '{VALUE} is not a valid genre',
      },
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: [true, 'ISBN must be unique'],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      min: 0,
      required: [true, 'Copies is required'],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Book = model('Book', BookSchema);
