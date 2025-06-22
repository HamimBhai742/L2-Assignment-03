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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRouter = express_1.default.Router();
//create new borrow
exports.borrowRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    const findBook = yield book_model_1.Book.findById(book);
    const copies = (findBook === null || findBook === void 0 ? void 0 : findBook.copies) || 0;
    const availableCopies = copies - quantity;
    if (availableCopies < 0) {
        res.status(404).json({
            success: false,
            message: 'Not enough copies available',
        });
        return;
    }
    const av = yield book_model_1.Book.availableQuntity(availableCopies);
    yield book_model_1.Book.findByIdAndUpdate(book, { copies: availableCopies, available: av }, { new: true });
    const borrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
    res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: borrow,
    });
}));
//Borrowed Books Summary (Using Aggregation)
exports.borrowRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrow = yield borrow_model_1.Borrow.aggregate([
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
}));
