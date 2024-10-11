import { Address } from '@commercetools/platform-sdk';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { deleteCustomerAddress } from '@/shared/api/requests/deleteCustomerAddress';
import { ApiResponse } from '@/pages/ProfilePage/ui/EditAddressModal/EditAddressModal';
import { getShippingAddresses } from '@/pages/ProfilePage/model/services/getShippingAddresses';
import { getBillingAddresses } from '@/pages/ProfilePage/model/services/getBillingAddresses';

export const deleteAddress = async (
  addressId: string,
  setAddresses: (addresses: Address[]) => void,
  addressType: 'Shipping' | 'Billing',
) => {
  try {
    const user = localStorage.getItem(LocalStorageKeys.USER);
    const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
    if (user && version) {
      const { id } = JSON.parse(user);
      const result = (await deleteCustomerAddress(
        id,
        addressId,
        version,
      )) as ApiResponse;
      if (result) {
        const customer = result.body;
        const newAddressArr =
          addressType === 'Shipping'
            ? getShippingAddresses(customer) || []
            : getBillingAddresses(customer) || [];
        setAddresses(newAddressArr);
      }
    } else {
      throw new Error('', {
        cause: 'LS',
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.cause === 'LS') {
        throw new Error(
          'Something wrong with local storage. Login and try again.',
          {
            cause: 'LS',
          },
        );
      }
      throw new Error(e.message, {
        cause: e.cause,
      });
    }
  }
};
