import UserService from '@/service/user.service';
import { IAxiosResponse } from '@/interface/generic.model';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_USER_REQUEST,
  addUserFailed,
  addUserSuccess,
  FETCH_BY_ID_USER_REQUEST,
  FETCH_USER_REQUEST,
  fetchByIdUserFailed,
  fetchByIdUserSuccess,
  fetchUserFailed,
  fetchUserSuccess,
  IFecthUserByIdRequestAction,
  updateUserActionFailed,
  updateUserActionSuccess,
  USER_ACTION_REQUEST,
} from '../action/user.action.action';

function* fetchUser() {
  try {
    const response: IAxiosResponse<any> = yield call(UserService.fetchUser);
    yield put(
      fetchUserSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error) {
    yield put(fetchUserFailed({ result: null, error: [], pending: false }));
  }
}
function* updateUser(action: any) {
  const data = action.payload._id;

  try {
    let response: IAxiosResponse<any>;
    if (data) {
      response = yield call(UserService.updateUser, action.payload);
    } else {
      response = yield call(UserService.addUser, action.payload);
    }
    yield put(
      addUserSuccess({
        result: response?.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error: any) {
    yield put(
      addUserFailed({
        error:
          typeof error?.response?.data == 'string'
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      }),
    );
  }
}

function* fetchUserById(action: IFecthUserByIdRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      UserService.fetchUserById,
      action.payload,
    );
    yield put(
      fetchByIdUserSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error) {
    yield put(fetchByIdUserFailed({ result: null, error: [], pending: false }));
  }
}

function* userAction(action: any) {
  try {
    const response: IAxiosResponse<any> = yield call(
      UserService.userAction,
      action.payload,
    );

    yield put(
      updateUserActionSuccess({
        result: response?.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error: any) {
    yield put(
      updateUserActionFailed({
        error:
          typeof error?.response?.data == 'string'
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      }),
    );
  }
}

export default function* userSaga() {
  yield all([takeLatest(FETCH_USER_REQUEST, fetchUser)]);
  yield all([takeLatest(FETCH_BY_ID_USER_REQUEST, fetchUserById)]);
  yield all([takeLatest(ADD_USER_REQUEST, updateUser)]);
  yield all([takeLatest(USER_ACTION_REQUEST, userAction)]);
}
