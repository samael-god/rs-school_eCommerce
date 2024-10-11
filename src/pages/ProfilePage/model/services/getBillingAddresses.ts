import { Address, Customer } from '@commercetools/platform-sdk';

export const getBillingAddresses = (
  customerData: Customer,
): Address[] | undefined => {
  const { addresses } = customerData;
  return addresses.filter(({ id }) => {
    return id ? customerData.billingAddressIds?.includes(id) : false;
  });
};
