export interface IAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  state: string;
  countryId?: number;
}
