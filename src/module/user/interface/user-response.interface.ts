import { IHttpResponse } from '../../../shared/interface/http-response.interface';
import { IListUserData } from './list-user-data.interface';
import { IUserDetail } from './user-detail.interface';
import { IUserPermission } from './user-permission.interface';

export interface IUserResponse extends IHttpResponse {
  data: IListUserData;
}

export interface ISingleUserResponse extends IHttpResponse {
  data: IUserDetail;
}

export interface IUserPermissionResponse extends IHttpResponse {
  data: IUserPermission[];
}

export interface IUserGeneratePinResponse extends IHttpResponse {
  data: { pin: number };
}
