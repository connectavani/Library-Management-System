import { ENDPOINT } from '@/constant/endpoint.const';
import { BookModel } from '@/interface/book.model';
import { axiosInstance } from '@/utils/axios.util';

export default class bookService {
  static fetchBooks = (page: number, limit: number) => {
    return axiosInstance.get(
      `${ENDPOINT.API_BASE_URL}${ENDPOINT.BOOK.API.FETCH_BOOK}?page=${page}&limit=${limit}`,
    );
  };

  static addBook = (param: BookModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.BOOK.API.ADD_BOOK,
      param,
    );
  };

  static updateBook = (param: BookModel) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.BOOK.API.UPDATE_BOOK + '/' + param?._id,
      param,
    );
  };

  static fetchBookById = (param: string) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.BOOK.API.FETCH_BOOK_BY_ID + '/' + param,
    );
  };

    static deleteBookById = (_id: any) => {
    return axiosInstance.delete(
      ENDPOINT.API_BASE_URL + ENDPOINT.BOOK.API.DELETE + '/' + _id,
    );
  };
}
