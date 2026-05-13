import { AppStore } from '@/interface/generic.model';
import { BookModel, IBookModel, } from '@/interface/book.model';

export const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILED = 'FETCH_BOOK_FAILED';

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILED = 'ADD_BOOK_FAILED';

export const FETCH_BY_ID_BOOK_REQUEST = 'FETCH_BY_ID_BOOK_REQUEST';
export const FETCH_BY_ID_BOOK_SUCCESS = 'FETCH_BY_ID_BOOK_SUCCESS';
export const FETCH_BY_ID_BOOK_FAILED = 'FETCH_BY_ID_BOOK_FAILED';

export const DELETE_BOOK_REQUEST = 'DELETE_BOOK_REQUEST';
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
export const DELETE_BOOK_FAILED = 'DELETE_BOOK_FAILED';

export interface IFetchBooKRequestAction {
  type: typeof FETCH_BOOK_REQUEST;
  payload: {
    page: number;
    limit: number;
  };
}
export interface IFetchBooKSuccessAction {
  type: typeof FETCH_BOOK_SUCCESS;
  payload: AppStore<BookModel[]>;
}
export interface IFetchBooKFailureAction {
  type: typeof FETCH_BOOK_FAILED;
  payload: AppStore<BookModel[]>;
}

export interface IAddBooKRequestAction {
  type: typeof ADD_BOOK_REQUEST;
  payload: IBookModel;
}

export interface IAddBooKSuccessAction {
  type: typeof ADD_BOOK_SUCCESS;
  payload: AppStore<IBookModel>;
}

export interface IAddBooKFailureAction {
  type: typeof ADD_BOOK_FAILED;
  payload: AppStore<IBookModel>;
}

export interface IFetchByIdBooKRequestAction {
  type: typeof FETCH_BY_ID_BOOK_REQUEST;
  payload: string;
}
export interface IFetchByIdBooKSuccessAction {
  type: typeof FETCH_BY_ID_BOOK_SUCCESS;
  payload: AppStore<IBookModel[]>;
}

export interface IFetchByIdBooKFailureAction {
  type: typeof FETCH_BY_ID_BOOK_FAILED;
  payload: AppStore<IBookModel[]>;
}

export interface IDeleteBooKRequestAction {
  type: typeof DELETE_BOOK_REQUEST;
  payload: string;
}

export interface IDeleteBooKSuccessAction {
  type: typeof DELETE_BOOK_SUCCESS;
  payload: AppStore<string>;
}

export interface IDeleteBooKFailureAction {
  type: typeof DELETE_BOOK_FAILED;
  payload: AppStore<string>;
}

export const fetchBooKRequest = (params: { page: number; limit: number }): IFetchBooKRequestAction => ({
  type: FETCH_BOOK_REQUEST,
  payload: params,
});

export const fetchBooKSuccess = (
  payload: AppStore<BookModel[]>,
): IFetchBooKSuccessAction => ({
  type: FETCH_BOOK_SUCCESS,
  payload,
});

export const fetchBooKFailed = (
  payload: AppStore<BookModel[]>,
): IFetchBooKFailureAction => ({
  type: FETCH_BOOK_FAILED,
  payload,
});

export const addBooKRequest = (payload: IBookModel): IAddBooKRequestAction => ({
  type: ADD_BOOK_REQUEST,
  payload,
});

export const addBooKSuccess = (
  payload: AppStore<IBookModel>,
): IAddBooKSuccessAction => ({
  type: ADD_BOOK_SUCCESS,
  payload,
});

export const addBooKFailed = (
  payload: AppStore<IBookModel>,
): IAddBooKFailureAction => ({
  type: ADD_BOOK_FAILED,
  payload,
});

export const fetchByIdBooKRequest = (
  payload: string,
): IFetchByIdBooKRequestAction => ({
  type: FETCH_BY_ID_BOOK_REQUEST,
  payload,
});
export const fetchByIdBooKSuccess = (
  payload: AppStore<IBookModel[]>,
): IFetchByIdBooKSuccessAction => ({
  type: FETCH_BY_ID_BOOK_SUCCESS,
  payload,
});

export const fetchByIdBooKFailed = (
  payload: AppStore<IBookModel[]>,
): IFetchByIdBooKFailureAction => ({
  type: FETCH_BY_ID_BOOK_FAILED,
  payload,
});

export const deleteBooKRequest = (
  payload: string,
): IDeleteBooKRequestAction => ({
  type: DELETE_BOOK_REQUEST,
  payload,
});

export const deleteBooKSuccess = (
  payload: AppStore<string>,
): IDeleteBooKSuccessAction => ({
  type: DELETE_BOOK_SUCCESS,
  payload,
});
export const deleteBooKFailure = (
  payload: AppStore<string>,
): IDeleteBooKFailureAction => ({
  type: DELETE_BOOK_FAILED,
  payload,
});

 export type BookActions=
| IFetchBooKRequestAction
| IFetchBooKSuccessAction
| IFetchBooKFailureAction
| IAddBooKRequestAction
| IAddBooKSuccessAction
| IAddBooKFailureAction
| IFetchByIdBooKRequestAction
| IFetchByIdBooKSuccessAction
| IFetchByIdBooKFailureAction
| IDeleteBooKRequestAction
| IDeleteBooKSuccessAction
| IDeleteBooKFailureAction;