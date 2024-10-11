import { Customer, Address } from '@commercetools/platform-sdk';

export const getShippingAddresses = (
  customerData: Customer | undefined,
): Address[] | [] => {
  if (customerData) {
    const { addresses } = customerData;
    return addresses.filter(({ id }) => {
      return id ? customerData.shippingAddressIds?.includes(id) : false;
    });
  }
  return [];
};
