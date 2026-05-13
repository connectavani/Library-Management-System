export interface IRoleModel {
  _id?: string;
  roleName: string;
}
export class RoleModel {
  _id?: string;
  roleName: string;
  constructor() {
    this._id = '';
    this.roleName = '';
  }
}
export class RoleFormModel extends RoleModel {
  isError: {
    _id: string;
    roleName: string;
  };
  fieldName: {
    _id: string;
    roleName: string;
  };
  constructor() {
    super();

    this.isError = {
      _id: '',
      roleName: '',
    };
    this.fieldName = {
      _id: '_id',
      roleName: 'roleName',
    };
  }
}

export interface IRoleRequestModel {
  statusCode?: string;
  type: string;
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}
export class RoleAppStore {
  list: {
    result: RoleModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: RoleModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: RoleModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: RoleModel | null | undefined;
    pending: boolean;
    error: any[];
  };

  constructor() {
    this.list = {
      result: null,
      pending: false,
      error: [],
    };
    this.view = {
      result: null,
      pending: false,
      error: [],
    };
    this.update = {
      result: null,
      pending: false,
      error: [],
    };
    this.delete = {
      result: null,
      pending: false,
      error: [],
    };
  }
}
