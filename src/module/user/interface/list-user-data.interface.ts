import { IPagination } from '../../../shared/interface/pagination.interface';
import { IUserDetail } from './user-detail.interface';

export interface IListUserData {
  pagination: IPagination;
  users: IUserDetail;
}
