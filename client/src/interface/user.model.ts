export interface IUserModel {
  _id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  contactNo?: string;
  email?: string;
  password?: string;
  city?: string;
  state?: string;
  roleId?: string;
  roleName?: string;
  schoolName?: string;
  schoolPrincipalName?: string;
  isAuthenticated?: boolean;
  userId?: string;
}

export class UserModel {
  _id?: string;
  firstName: string;
  lastName: string;
    name?: string;
  contactNo: string;
  email: string;
  roleId: string;
  roleName: string;
  password?: string;
  city?: string;
  state?: string;
  schoolName?: string;
  schoolPrincipalName?: string;
  isAuthenticated?: boolean;
  userId?: string;

  constructor() {
    this._id = '';
    this.firstName = '';
    this.lastName = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.city = '';
    this.state = '';
    this.roleId = '';
    this.roleName = '';
    this.contactNo = '';
    this.schoolName = '';
    this.schoolPrincipalName = '';
    this.isAuthenticated = false;
    this.userId = '';
  }
}

export class UserFormModel extends UserModel {
  isError: {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
    city: string;
    state: string;
    GSTNO: string;
    responsiblePersonName: string;
    responsiblePersonContactNo: string;
    responsiblePersonEmailId: string;
    roleId: string;
    roleName: string;
    consumerId: string;
    contactNo: string;
    schoolName: string;
    schoolPrincipalName: string;
  };
  fieldName: {
    _id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
    city: string;
    state: string;
    roleId: string;
    roleName: string;
    contactNo: string;
    schoolName: string;
    schoolPrincipalName: string;
  };

  constructor() {
    super();

    this.isError = {
      id: '',
      firstName: '',
      lastName: '',
      name: '',
      password: '',
      responsiblePersonEmailId: '',
      email: '',
      responsiblePersonContactNo: '',
      responsiblePersonName: '',
      GSTNO: '',
      city: '',
      state: '',
      consumerId: '',
      contactNo: '',
      roleId: '',
      roleName: '',
      schoolName: '',
      schoolPrincipalName: '',
    };
    this.fieldName = {
      _id: '_id',
      firstName: 'firstName',
      lastName: 'lastName',
      name: "name",
      email: 'email',
      password: 'password',
      contactNo: 'contactNo',
      city: 'city',
      state: 'state',
      roleId: 'roleId',
      roleName: 'roleName',
      schoolPrincipalName: 'schoolPrincipalName',
      schoolName: 'schoolName',
    };
  }
}

export interface IUserRequestModel {
  statusCode?: string;
  type: string;
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}

export class UserAppStore {
  list: {
    result: UserModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: UserModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: UserModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: UserModel | null | undefined;
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

//#endregion
