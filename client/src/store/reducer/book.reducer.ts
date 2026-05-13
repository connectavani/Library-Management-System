import { BookAppStore } from '@/interface/book.model';
import {
  ADD_BOOK_FAILED,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  BookActions,
  DELETE_BOOK_FAILED,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  FETCH_BOOK_FAILED,
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  FETCH_BY_ID_BOOK_FAILED,
  FETCH_BY_ID_BOOK_REQUEST,
  FETCH_BY_ID_BOOK_SUCCESS,
} from '../action/book.action';

const initialState: BookAppStore = new BookAppStore();

const bookReducer = (state = initialState, action: BookActions) => {
  switch (action.type) {
    case FETCH_BOOK_REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          pending: true,
        },
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          result: action.payload.result,
          pending: false,
        },
      };
    case FETCH_BOOK_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          pending: false,
          error: action.payload.error,
        },
      } as typeof initialState;
    case ADD_BOOK_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;

    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;

    case ADD_BOOK_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_BY_ID_BOOK_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_BOOK_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;
    case FETCH_BY_ID_BOOK_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: true,
        },
      } as typeof initialState;
    case DELETE_BOOK_REQUEST:
      return {
        ...state,
        delete: {
          pending: true,
        },
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        delete: {
          result: action?.payload?.result,
          pending: false,
        },
        list: {
          result: state.list.result?.filter(
            (x) => x?._id !== action.payload.result,
          ),
        },
      };
    case DELETE_BOOK_FAILED:
      return {
        ...state,
        delete: {
          pending: false,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};
export default bookReducer;
