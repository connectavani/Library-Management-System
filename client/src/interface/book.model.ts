export interface IBookModel {
  _id: string;
  title: string;
  status: string;
  author: string;
  publishedYear: string;
}
export class BookModel {
  _id?: string;
  title: string;
  status: string;
  author: string;
  publishedYear: string;
  constructor() {
    this._id = '';
    this.title = '';
    this.status = '';
    this.author = '';
    this.publishedYear = '';
  }
}
export class BookFormModel extends BookModel {
  isError: {
    _id: string;
    title: string;
    status: string;
  };
  fieldName: {
    _id: string;
    title: string;
    status: string;
    author: string;
    publishedYear: string;
  };
  constructor() {
    super();

    this.isError = {
      _id: '',
      title: '',
      status: '',
    };
    this.fieldName = {
      _id: '_id',
      title: 'title',
      status: 'status',
      author: 'author',
      publishedYear: 'publishedYear',
    };
  }
}

export interface IBookRequestModel {
  statusCode?: string;
  type: string;
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}
export class BookAppStore {
  list: {
    result: BookModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: BookModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: BookModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: BookModel | null | undefined;
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
