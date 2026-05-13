import { RoleAppStore } from '@/interface/role';
import {
  ADD_ROLE_FAILED,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  FETCH_BY_ID_ROLE_FAILED,
  FETCH_BY_ID_ROLE_REQUEST,
  FETCH_BY_ID_ROLE_SUCCESS,
  FETCH_ROLE_FAILED,
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  RESET_DELETE_ROLE,
  RoleActions,
} from '../action/role.action';

const initialState: RoleAppStore = new RoleAppStore();

const roleReducer = (state = initialState, action: RoleActions) => {
  switch (action.type) {
    case ADD_ROLE_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;

    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;

    case ADD_ROLE_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: false,
        },
      } as typeof initialState;
    case FETCH_ROLE_REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          pending: true,
        },
      };
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          result: action.payload.result,
          pending: false,
        },
      };
    case FETCH_ROLE_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          pending: false,
          error: action.payload.error,
        },
      };
    case FETCH_BY_ID_ROLE_REQUEST:
      return {
        ...state,
        update: {
          result: null,
          pending: true,
          error: [],
        },
      } as typeof initialState;

    case FETCH_BY_ID_ROLE_SUCCESS:
      return {
        ...state,
        update: {
          result: action.payload.result,
          pending: false,
          error: [],
        },
      } as typeof initialState;

    case FETCH_BY_ID_ROLE_FAILED:
      return {
        ...state,
        update: {
          error: action.payload.error,
          pending: true,
        },
      } as typeof initialState;

    //DELETE
    case DELETE_ROLE_REQUEST:
      return {
        ...state,
        delete: {
          pending: true,
        },
      };
    case DELETE_ROLE_SUCCESS:
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
    case DELETE_ROLE_FAILED:
      return {
        ...state,
        delete: {
          pending: false,
          error: action.payload.error,
        },
      };
    case RESET_DELETE_ROLE:
      return {
        ...state,
        delete: {
          error: [],
          pending: false,
          result: null,
        },
      } as typeof initialState;
    default:
      return state;
  }
};
export default roleReducer;
