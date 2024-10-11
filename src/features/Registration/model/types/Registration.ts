import { CountryType } from '@/shared/const/Countries';

export type SubmitData = {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  surname: string;
  birthdate: string;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: CountryType;
  shippingPostal: string;
  shippingIsDefault: boolean;
  shippingAsBilling: boolean;
  billingStreet: string;
  billingCity: string;
  billingCountry: CountryType;
  billingPostal: string;
  billingIsDefault: boolean;
};
