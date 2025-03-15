import { AxiosInstance, AxiosResponse } from 'axios';

import { HttpService } from '../../../core/services/http.service';
import { IAuthResponse } from '../interface/auth-response.interface';
import { LoginUserInputProps } from '../types/login-user-input-props.type';
import { RegisterUserInputProps } from '../types/register-user-input-props.type';

export class AuthApi {
  private http: AxiosInstance;
  constructor() {
    this.http = new HttpService().getInstance();
  }

  async register(
    props: RegisterUserInputProps,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return this.http.post('/auth/register', props);
  }

  async login(
    props: LoginUserInputProps,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return this.http.post('/auth/login', props);
  }

  async logout(): Promise<AxiosResponse<IAuthResponse>> {
    return this.http.post('/auth/logout', {});
  }
}
