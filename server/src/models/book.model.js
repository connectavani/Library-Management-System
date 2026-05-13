import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "pending"
  },

  author: {
    type: String,
    default: "medium"
  },

  publishedYear: {
    type: Number,
    required: true
  },
 
}, { timestamps: true });

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;