import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  AUTHENTICATE_USER_REQUEST,
  authenticateFailed,
  authenticateSuccess,
  forgetPasswordFailed,
  forgetPasswordSuccess,
  FORGOT_PASSWORD_REQUEST,
  IForgetPasswordRequestAction,
  LOGOUT_USER_REQUEST,
} from '../action/auth.action';
import { IAxiosResponse } from '@/interface/generic.model';
import AuthService from '@/service/auth.service';
import { IAuthenticationRequestModel } from '@/interface/auth.model';
//  Function to compute academic year as "2025-26"
function getAcademicYear(): string {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return `${currentYear}-${nextYear.toString().slice(-2)}`;
}
function* authenticateUser(action: {
  type: string;
  payload: IAuthenticationRequestModel;
}) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AuthService.authenticateUser,
      action.payload,
    );
    // Add your log here:
    // Extract the year string from response.data (adjust key if different)
    const year =
      response.data.academicYear || response.data.year || getAcademicYear();
    // Build new auth object including the year string
    const authDataWithYear = {
      ...response.data,
      year, // Use year variable here instead of hardcoded string
    };
    yield put(
      authenticateSuccess({
        result: authDataWithYear,
        error: [],
        pending: false,
      }),
    );

    AuthService.setAuthDetail(authDataWithYear);
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'An unexpected error occurred';

    yield put(
      authenticateFailed({
        error: [errorMessage],
        pending: false,
      }),
    );
  }
}

function* forgetPassword(action: IForgetPasswordRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      AuthService.forgetPassowrd,
      action.payload,
    );
    yield put(
      forgetPasswordSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error: any) {
    yield put(
      forgetPasswordFailed({
        error: [error.response.data.message],
        pending: false,
      }),
    );
  }
}

function* logoutUser() {
  yield call(AuthService.logoutUser);
}

export default function* authenticateUserSaga() {
  yield all([
    takeLatest(AUTHENTICATE_USER_REQUEST, authenticateUser),
    takeLatest(LOGOUT_USER_REQUEST, logoutUser),
    takeLatest(FORGOT_PASSWORD_REQUEST, forgetPassword),
  ]);
}
