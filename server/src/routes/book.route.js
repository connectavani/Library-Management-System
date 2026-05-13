import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/book.controller.js';

const bookRouter = express.Router();

bookRouter.post('/create', createBook);
bookRouter.get('/getAll', getAllBooks);
bookRouter.get('/getById/:id', getBookById);
bookRouter.put('/update/:id', updateBook);
bookRouter.delete('/delete/:id', deleteBook);


export default bookRouter;

