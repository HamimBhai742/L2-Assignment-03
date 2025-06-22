"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouter = express_1.default.Router();
//create new book
exports.bookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        console.log(book);
        const user = yield book_model_1.Book.create(book);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error: error,
        });
    }
}));
//get all books
exports.bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sort, limit } = req.query;
    let books = [];
    if (!filter) {
        books = yield book_model_1.Book.find()
            .sort({ createdAt: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit));
    }
    else {
        books = yield book_model_1.Book.find({ genre: filter })
            .sort({
            createdAt: sort === 'asc' ? 1 : -1,
        })
            .limit(parseInt(limit));
    }
    res.status(201).json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
    });
}));
//get book by id
exports.bookRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield book_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
}));
//update book by id
exports.bookRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = req.body;
    const updateBook = yield book_model_1.Book.findByIdAndUpdate(bookId, book, { new: true });
    res.status(201).json({
        success: true,
        message: 'Book updated successfully',
        data: updateBook,
    });
}));
//delete book by id
exports.bookRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: 'Book deleted successfully',
        data: null
    });
}));
