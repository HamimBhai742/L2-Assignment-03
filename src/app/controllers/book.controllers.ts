import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { data } from 'react-router-dom';

export const bookRouter = express.Router();

//create new book
bookRouter.post('/', async (req: Request, res: Response) => {
  try {
    const book = req.body;
    console.log(book);
    const user = await Book.create(book);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: error,
    });
  }
});

//get all books
bookRouter.get('/', async (req: Request, res: Response) => {
  const { filter, sort, limit } = req.query;
  let books = [];
  if (!filter) {
    books = await Book.find()
      .sort({ createdAt: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string));
  } else {
    books = await Book.find({ genre: filter })
      .sort({
        createdAt: sort === 'asc' ? 1 : -1,
      })
      .limit(parseInt(limit as string));
  }
  res.status(201).json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  });
});

//get book by id
bookRouter.get('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  res.status(201).json({
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  });
});

//update book by id
bookRouter.put('/:bookId', async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = req.body;
  const updateBook = await Book.findByIdAndUpdate(bookId, book, { new: true });
  res.status(201).json({
    success: true,
    message: 'Book updated successfully',
    data: updateBook,
  });
});

//delete book by id
bookRouter.delete('/:bookId', async (req:Request, res:Response) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);
  res.status(201).json({
    success: true,
    message: 'Book deleted successfully',
    data: null
  });
});
