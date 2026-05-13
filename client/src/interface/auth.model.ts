/**
 * @Rulebook
 * Interface name should have prefix - `I` & suffix - `Model`.
 * example: IClaimModel
 */
export interface IClaimModel {
  claimType: string;
  claimValue: boolean;
}

export class AuthenticationModel {
  _id: string;
  email?: string;
  roleId: string;
  roleName: string;
  isAuthenticated: boolean;
  year?:string;
  claims: IClaimModel[];
  /**
   *
   */
  constructor() {
    this._id = "";
    this.email = "";
    this.roleId = "";
    this.roleName = "";
    this.isAuthenticated = false;
    this.year = "";
    this.claims = [];
  }
}

export interface IAuthenticationRequestModel {
  email?: string;
  password?: string;
}
