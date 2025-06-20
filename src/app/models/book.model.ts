import { Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const BookSchema=new Schema<IBook>({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String

  },
  copies: {
    type: Number,
    min: 0,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
})