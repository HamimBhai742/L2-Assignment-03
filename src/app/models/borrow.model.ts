import  { model, Schema } from "mongoose";

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
},{
  timestamps: true,
  versionKey: false
});

export const Borrow = model('Borrow', BorrowSchema);

