import { IUser } from '../../../shared/interface/user.interface';

export interface IAuthState {
  authUser: IUser;
  isLoading: boolean;
}
