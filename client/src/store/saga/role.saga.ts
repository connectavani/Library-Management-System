import { IAxiosResponse } from '@/interface/generic.model';
import RoleService from '@/service/role.service';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_ROLE_REQUEST,
  addRoleFailed,
  addRoleSuccess,
  DELETE_ROLE_REQUEST,
  deleteRoleSFailure,
  deleteRoleSuccess,
  FETCH_BY_ID_ROLE_REQUEST,
  FETCH_ROLE_REQUEST,
  fetchbyidaddRoleFailed,
  fetchbyidaddRoleSuccess,
  fetchRolefailed,
  fetchRoleSuccess,
  IDeleteRoleRequestAction,
  IFetchByIdAddRoleRequestAction,
} from '../action/role.action';

function* updateRole(action: any) {
  const data = action.payload._id;

  try {
    let response: IAxiosResponse<any>;
    if (data) {
      response = yield call(RoleService.updateRole, action.payload);
    } else {
      response = yield call(RoleService.addRole, action.payload);
    }
    yield put(
      addRoleSuccess({
        result: response?.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error: any) {
    yield put(
      addRoleFailed({
        error:
          typeof error?.response?.data == 'string'
            ? [error?.response?.data]
            : error?.response?.data,
        pending: false,
      }),
    );
  }
}

function* fetchRole() {
  try {
    const response: IAxiosResponse<any> = yield call(RoleService.fetchRole);
    yield put(
      fetchRoleSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error) {
    yield put(fetchRolefailed({ result: null, error: [], pending: false }));
  }
}
function* delRoleById(action: IDeleteRoleRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      RoleService.deleteRoleById,
      action.payload,
    );
    yield put(
      deleteRoleSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error: any) {
    yield put(
      deleteRoleSFailure({
        result: error?.response?.data,
        error: [],
        pending: false,
      }),
    );
  }
}
function* fetchRoleById(action: IFetchByIdAddRoleRequestAction) {
  try {
    const response: IAxiosResponse<any> = yield call(
      RoleService.fetchRoleById,
      action.payload,
    );
    yield put(
      fetchbyidaddRoleSuccess({
        result: response.data,
        error: [],
        pending: false,
      }),
    );
  } catch (error) {
    yield put(
      fetchbyidaddRoleFailed({ result: null, error: [], pending: false }),
    );
  }
}

export default function* roleSaga() {
  yield all([
    takeLatest(FETCH_ROLE_REQUEST, fetchRole),
    takeLatest(DELETE_ROLE_REQUEST, delRoleById),
    takeLatest(FETCH_BY_ID_ROLE_REQUEST, fetchRoleById),
    takeLatest(ADD_ROLE_REQUEST, updateRole),
  ]);
}
