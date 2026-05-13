import { AppStore } from '@/interface/generic.model';
import { IRoleModel, RoleModel } from '@/interface/role';

export const FETCH_ROLE_REQUEST = 'FETCH_ROLE_REQUEST';
export const FETCH_ROLE_SUCCESS = 'FETCH_ROLE_SUCCESS';
export const FETCH_ROLE_FAILED = 'FETCH_ROLE_FAILED';
export const ADD_ROLE_REQUEST = 'ADD_ROLE_REQUEST';
export const ADD_ROLE_SUCCESS = 'ADD_ROLE_SUCCESS';
export const ADD_ROLE_FAILED = 'ADD_ROLE_FAILED';

export const DELETE_ROLE_REQUEST = 'DELETE_ROLE_REQUEST';
export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_FAILED = 'DELETE_ROLE_FAILED';
export const RESET_DELETE_ROLE = 'RESET_DELETE_ROLE';

export const FETCH_BY_ID_ROLE_REQUEST = 'FETCH_BY_ID_ROLE_REQUEST';
export const FETCH_BY_ID_ROLE_SUCCESS = 'FETCH_BY_ID_ROLE_SUCCESS';
export const FETCH_BY_ID_ROLE_FAILED = 'FETCH_BY_ID_ROLE_FAILED';

export interface IFetchRoleRequestAction {
  type: typeof FETCH_ROLE_REQUEST;
}
export interface IFetchRoleSuccessAction {
  type: typeof FETCH_ROLE_SUCCESS;
  payload: AppStore<RoleModel[]>;
}
export interface IFetchRoleFailureAction {
  type: typeof FETCH_ROLE_FAILED;
  payload: AppStore<RoleModel[]>;
}
export interface IResetDeleteRole {
  type: typeof RESET_DELETE_ROLE;
}
//FETCH BY ID
export interface IFetchByIdAddRoleRequestAction {
  type: typeof FETCH_BY_ID_ROLE_REQUEST;
  payload: string;
}
export interface IFetchByIdAddRoleSuccessAction {
  type: typeof FETCH_BY_ID_ROLE_SUCCESS;
  payload: AppStore<IRoleModel[]>;
}

export interface IFetchByIdAddRoleFailureAction {
  type: typeof FETCH_BY_ID_ROLE_FAILED;
  payload: AppStore<IRoleModel[]>;
}
//DELETE BY ID
export interface IDeleteRoleRequestAction {
  type: typeof DELETE_ROLE_REQUEST;
  payload: string;
}

export interface IDeleteRoleSuccessAction {
  type: typeof DELETE_ROLE_SUCCESS;
  payload: AppStore<string>;
}

export interface IDeleteRoleFailureAction {
  type: typeof DELETE_ROLE_FAILED;
  payload: AppStore<string>;
}
//Action functions
export const fetchRoleRequest = (): IFetchRoleRequestAction => ({
  type: FETCH_ROLE_REQUEST,
});

export const fetchRoleSuccess = (
  payload: AppStore<RoleModel[]>,
): IFetchRoleSuccessAction => ({
  type: FETCH_ROLE_SUCCESS,
  payload,
});

export const fetchRolefailed = (
  payload: AppStore<RoleModel[]>,
): IFetchRoleFailureAction => ({
  type: FETCH_ROLE_FAILED,
  payload,
});
export const deleteRoleRequest = (
  payload: string,
): IDeleteRoleRequestAction => ({
  type: DELETE_ROLE_REQUEST,
  payload,
});
export interface IAddRoleRequestAction {
  type: typeof ADD_ROLE_REQUEST;
  payload: IRoleModel;
}

export interface IAddRoleSuccessAction {
  type: typeof ADD_ROLE_SUCCESS;
  payload: AppStore<IRoleModel>;
}

export interface IAddRoleFailureAction {
  type: typeof ADD_ROLE_FAILED;
  payload: AppStore<IRoleModel>;
}
export const fetchbyidaddRoleRequest = (
  payload: string,
): IFetchByIdAddRoleRequestAction => ({
  type: FETCH_BY_ID_ROLE_REQUEST,
  payload,
});
export const fetchbyidaddRoleSuccess = (
  payload: AppStore<IRoleModel[]>,
): IFetchByIdAddRoleSuccessAction => ({
  type: FETCH_BY_ID_ROLE_SUCCESS,
  payload,
});

export const fetchbyidaddRoleFailed = (
  payload: AppStore<IRoleModel[]>,
): IFetchByIdAddRoleFailureAction => ({
  type: FETCH_BY_ID_ROLE_FAILED,
  payload,
});
//
export const addRoleRequest = (payload: IRoleModel): IAddRoleRequestAction => ({
  type: ADD_ROLE_REQUEST,
  payload,
});

export const addRoleSuccess = (
  payload: AppStore<IRoleModel>,
): IAddRoleSuccessAction => ({
  type: ADD_ROLE_SUCCESS,
  payload,
});

export const addRoleFailed = (
  payload: AppStore<IRoleModel>,
): IAddRoleFailureAction => ({
  type: ADD_ROLE_FAILED,
  payload,
});
export const deleteRoleSuccess = (
  payload: AppStore<string>,
): IDeleteRoleSuccessAction => ({
  type: DELETE_ROLE_SUCCESS,
  payload,
});
export const deleteRoleSFailure = (
  payload: AppStore<string>,
): IDeleteRoleFailureAction => ({
  type: DELETE_ROLE_FAILED,
  payload,
});
export const resetDeleteRole = (): IResetDeleteRole => ({
  type: RESET_DELETE_ROLE,
});
export type RoleActions =
  | IFetchRoleRequestAction
  | IFetchRoleSuccessAction
  | IFetchRoleFailureAction
  | IDeleteRoleRequestAction
  | IDeleteRoleSuccessAction
  | IDeleteRoleFailureAction
  | IFetchByIdAddRoleRequestAction
  | IFetchByIdAddRoleSuccessAction
  | IFetchByIdAddRoleFailureAction
  | IAddRoleRequestAction
  | IAddRoleSuccessAction
  | IAddRoleFailureAction
  | IResetDeleteRole;
