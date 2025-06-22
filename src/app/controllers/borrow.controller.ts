import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

export const borrowRouter = express.Router();

//create new borrow
borrowRouter.post('/', async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  const findBook = await Book.findById(book);
  const copies = findBook?.copies || 0;
  const availableCopies = copies - quantity;

  if (availableCopies < 0) {
    res.status(404).json({
      success: false,
      message: 'Not enough copies available',
    });
    return;
  }
  const av = await Book.availableQuntity(availableCopies);
  await Book.findByIdAndUpdate(
    book,
    { copies: availableCopies, available: av },
    { new: true }
  );
  
  const borrow = await Borrow.create({ book, quantity, dueDate });
  res.status(201).json({
    success: true,
    message: 'Book borrowed successfully',
    data: borrow,
  });
});

//Borrowed Books Summary (Using Aggregation)
borrowRouter.get('/', async (req: Request, res: Response) => {
  const borrow = await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: {
          $sum: '$quantity',
        },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'book',
      },
    },
    {
      $unwind: '$book',
    },
    {
      $project: {
        _id: 0,
        book: {
          title: '$book.title',
          isbn: '$book.isbn',
        },
        totalQuantity: 1,
      },
    },
  ]);
  res.status(201).json({
    success: true,
    message: 'Borrowed books summary retrieved successfully',
    data: borrow,
  });
});
