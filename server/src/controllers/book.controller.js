import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import BookService from "../services/Book.service.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createBook = CatchAsyncError(async (req, res, next) => {
  try {
    const { title, description, status, author, publishedYear } = req.body;

    // Validation
    if (!title) {
      return next(new ErrorHandler("Book title is required", 400));
    }

    if (!publishedYear) {
      return next(new ErrorHandler("Published year is required", 400));
    }

    const data = {
      title,
      description,
      status,
      author,
      publishedYear,
    };

    // Call service
    const Book = await BookService.create(data);

    // Response
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: Book,
    });

  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Failed to create Book", 500)
    );
  }
});
// Get All Books
// Controller
export const getAllBooks = CatchAsyncError(async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const Books = await BookService.getAll(page, limit);

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: Books,
    });

  } catch (error) {
    return next(
      new ErrorHandler(
        error.message || "Failed to fetch Books",
        500
      )
    );
  }
});


// Get Book By ID
export const getBookById = CatchAsyncError(async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Book ID is required", 400));
    }

    const Book = await BookService.getById(id);

    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: Book,
    });

  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Failed to fetch Book", 500)
    );
  }
});

// Update Book
export const updateBook = CatchAsyncError(async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Book ID is required", 400));
    }

    const {
      title,
      description,
      status,
      author,
      publishedYear,
    } = req.body;

    const data = {
      title,
      description,
      status,
      author,
      publishedYear,
    };

    const updatedBook = await BookService.update(id, data);

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });

  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Failed to update Book", 500)
    );
  }
});


// Delete Book
export const deleteBook = CatchAsyncError(async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Book ID is required", 400));
    }

    await BookService.delete(id);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Failed to delete Book", 500)
    );
  }
});