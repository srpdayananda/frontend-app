import { EUserRole } from '../enums/user-role.enum';
import { TUserPermission } from '../types/user-permission.type';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: null | string;
  companyId: string;
  roles: EUserRole[];
  phoneNumber?: null | string;
  imageUrl?: string;
  permissions?: TUserPermission[];
}
