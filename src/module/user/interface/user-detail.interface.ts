import { EUserRole } from '../../../shared/enums/user-role.enum';
import { IAddress } from '../../../shared/interface/address.interface';
import { TUserPermission } from '../../../shared/types/user-permission.type';

export interface IUserDetail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyId: string;
  roles: EUserRole[];
  phoneNumber: string;
  imageUrl: string;
  permissions?: TUserPermission[];
  status: string;
  address: IAddress | null;
}
