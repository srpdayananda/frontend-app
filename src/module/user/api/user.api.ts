import { AxiosInstance, AxiosResponse } from 'axios';

import { HttpService } from '../../../core/services/http.service';
import { TGetUserInputProps } from '../types/user-input-props.type';
import {
  ISingleUserResponse,
  IUserGeneratePinResponse,
  IUserPermissionResponse,
  IUserResponse,
} from '../interface/user-response.interface';
import { IHttpResponse } from '../../../shared/interface/http-response.interface';
import { TPaginationInputProps } from '../../../shared/types/pagination-input-props.type';

export class UserApi {
  private http: AxiosInstance;

  private readonly formDataHeader = { 'Content-Type': 'multipart/form-data' };

  constructor() {
    this.http = new HttpService().getInstance();
  }

  async getUsers(
    props: TPaginationInputProps,
  ): Promise<AxiosResponse<IUserResponse>> {
    return this.http.get(`/user?page=${props.page}&perPage=${props.perPage}`);
  }

  async getSingleUser(
    props: TGetUserInputProps,
  ): Promise<AxiosResponse<ISingleUserResponse>> {
    return this.http.get(`/user/${props.id}`);
  }

  async getUserPermission(): Promise<AxiosResponse<IUserPermissionResponse>> {
    return this.http.get('/permission');
  }

  async generatePin(): Promise<AxiosResponse<IUserGeneratePinResponse>> {
    return this.http.get('/user/pin/generate');
  }

  async createUser(payload: FormData): Promise<AxiosResponse<IHttpResponse>> {
    return this.http.post('/user', payload, { headers: this.formDataHeader });
  }

  async updateUser(payload: FormData): Promise<AxiosResponse<IHttpResponse>> {
    return this.http.put('/user', payload, { headers: this.formDataHeader });
  }

  // new api base on users
  async getAllUsers(): Promise<AxiosResponse<IHttpResponse>> {
    return this.http.get('/users');
  } 
}
