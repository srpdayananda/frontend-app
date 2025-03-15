import { IAddress } from '../interface/address.interface';

export type TAddressChangeData = {
  isValid: boolean;
  addressData: IAddress | null;
  error?: Partial<Record<keyof IAddress, string>>;
};
