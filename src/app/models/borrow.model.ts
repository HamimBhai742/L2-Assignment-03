import  { Schema } from "mongoose";

const BorrowSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});