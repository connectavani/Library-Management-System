// services/Book.service.js

import BookModel from "../models/Book.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";


class BookService {
  
  // Create Book
  async create(data) {
    try {
      const Book = await BookModel.create(data);
      return Book;
    } catch (error) {
      throw new ErrorHandler(error.message);
    }
  }

  // Get All Books
// Service
async getAll(page = 1, limit = 5) {
  try {

    const skip = (page - 1) * limit;

    const Books = await BookModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalRecords = await BookModel.countDocuments();

    return {
      Books,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
    };

  } catch (error) {
    throw new Error(error.message);
  }
}

//   // Get Single Book
  async getById(id) {
    try {
      const Book = await BookModel.findById(id);

      if (!Book) {
        throw new Error("Book not found");
      }

      return Book;
    } catch (error) {
      throw new Error(error.message);
    }
  }

//   // Update Book
  async update(id, data) {
    try {
      const Book = await BookModel.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!Book) {
        throw new Error("Book not found");
      }

      return Book;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete Book
  async delete(id) {
    try {
      const Book = await BookModel.findByIdAndDelete(id);

      if (!Book) {
        throw new Error("Book not found");
      }

      return Book;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}


export default new BookService;