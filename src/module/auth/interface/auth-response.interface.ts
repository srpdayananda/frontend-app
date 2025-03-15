import { IHttpResponse } from '../../../shared/interface/http-response.interface';
import { IUser } from '../../../shared/interface/user.interface';

export interface IAuthResponse extends IHttpResponse {
  data: IUser;
}