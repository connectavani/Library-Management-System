import { all, call, put, takeLatest } from "redux-saga/effects";
import { IAxiosResponse } from "@/interface/generic.model";
import {  ADD_BOOK_REQUEST, addBooKFailed, addBooKSuccess, DELETE_BOOK_REQUEST, deleteBooKFailure, deleteBooKSuccess, FETCH_BOOK_REQUEST, FETCH_BY_ID_BOOK_REQUEST, fetchBooKFailed, fetchBooKSuccess, fetchByIdBooKFailed, fetchByIdBooKSuccess, IDeleteBooKRequestAction, IFetchBooKRequestAction, IFetchByIdBooKRequestAction } from "../action/book.action";
import bookService from "@/service/book.service";

function* fetchBook(action: IFetchBooKRequestAction) {
  try {
    const { page, limit } = action.payload;

    const response: IAxiosResponse<any> = yield call(
      bookService.fetchBooks,
      page,
      limit
    );

    yield put(
      fetchBooKSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );

  } catch (error) {
    yield put(fetchBooKFailed({ result: null, error: [], pending: false }));
  }
}

function* updateBook(action: any) {
  const data = action.payload._id;

  try {
    let response: IAxiosResponse<any>;
    if (data) {
      response = yield call(bookService.updateBook, action.payload);
    } else {
      response = yield call(bookService.addBook, action.payload);
    }
    yield put(
      addBooKSuccess({
        result: response?.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error: any) {
    yield put(
      addBooKFailed({
        error:
          typeof error?.response?.data == 'string'
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      }),
    );
  }
}

function* fetchBookById(action: IFetchByIdBooKRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      bookService.fetchBookById,
      action.payload,
    );
    yield put(
      fetchByIdBooKSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error) {
    yield put(
      fetchByIdBooKFailed({ result: null, error: [], pending: false }),
    );
  }
}

function* deleteBookById(action: IDeleteBooKRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      bookService.deleteBookById,
      action.payload,
    );
    yield put(
      deleteBooKSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error: any) {
    yield put(
      deleteBooKFailure({
        result: error?.response?.data,
        error: [],
        pending: false,
      }),
    );
  }
}

export default function* bookSaga() {
  yield all([
    takeLatest(FETCH_BOOK_REQUEST, fetchBook),
    takeLatest(ADD_BOOK_REQUEST, updateBook),
    takeLatest(FETCH_BY_ID_BOOK_REQUEST, fetchBookById),
    takeLatest(DELETE_BOOK_REQUEST, deleteBookById),
  ]);
}