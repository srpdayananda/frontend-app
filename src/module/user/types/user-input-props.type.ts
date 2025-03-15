import { EUserRole } from '../../../shared/enums/user-role.enum';
import { IAddress } from '../../../shared/interface/address.interface';

export type TGetUserInputProps = {
  id: string;
};

export type TUserPermissions = {
  [key: string]: boolean;
};

export type TUserFormValue = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: EUserRole[];
  password?: string;
  pin?: string;
  address?: IAddress;
  permission?: Record<string, boolean>;
  file?: File;
};
