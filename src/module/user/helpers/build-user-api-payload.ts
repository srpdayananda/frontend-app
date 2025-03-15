import { IAddress } from '../../../shared/interface/address.interface';
import { EUserActionMode } from '../enums/user-action-mode.enum';
import { TUserFormValue } from '../types/user-input-props.type';

export const buildUserAPIPayload = (
  formValues: TUserFormValue,
  address: IAddress | null,
  mode: EUserActionMode,
  userId: string | undefined,
): FormData => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    pin,
    permission,
    roles,
    file,
  } = formValues;

  const formData = new FormData();

  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('phoneNumber', phoneNumber);
  formData.append('roles', JSON.stringify(roles));

  if (mode === EUserActionMode.Add) {
    formData.append('email', email);
    formData.append('password', password!);
    formData.append('pin', pin!);
  }
  if (mode === EUserActionMode.Edit) {
    formData.append('id', userId!);
  }
  if (permission) {
    formData.append('permission', JSON.stringify(permission));
  }
  if (address) {
    formData.append('address', JSON.stringify(address));
  }
  if (file) {
    formData.append('file', file);
  }
  return formData;
};
