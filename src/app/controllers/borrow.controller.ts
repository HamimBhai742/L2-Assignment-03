import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

export const borrowRouter = express.Router();

borrowRouter.post('/', async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  const findBook = await Book.findById(book);
  const copies = findBook?.copies || 0;
  console.log(copies, quantity);
  const availableCopies = copies - quantity;
  console.log('availableCopies', availableCopies);
  if (availableCopies < 0) {
    res.status(404).json({
      success: false,
      message: 'Not enough copies available',
    });
    return;
  }
  const av = await Book.availableQuntity(availableCopies);
  console.log(av);
  const updateBook = await Book.findByIdAndUpdate(
    book,
    { copies: availableCopies, available: av },
    { new: true }
  );
  console.log(updateBook);
  const borrow = await Borrow.create({ book, quantity, dueDate });
  res.status(201).json({
    success: true,
    message: 'Book borrowed successfully',
    data: borrow,
  });
});
