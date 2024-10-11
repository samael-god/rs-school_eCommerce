import { Address } from '@commercetools/platform-sdk';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { addCustomerAddress } from '@/shared/api/requests/addCustomerAddress';
import { editCustomerAddress } from '@/shared/api/requests/editCustomerAddress';
import {
  AddressData,
  ApiResponse,
} from '@/pages/ProfilePage/ui/EditAddressModal/EditAddressModal';
import { ToastTypes, userMessage } from '@/shared/const/ToastConfig';
import { getShippingAddresses } from '@/pages/ProfilePage/model/services/getShippingAddresses';
import { getBillingAddresses } from '@/pages/ProfilePage/model/services/getBillingAddresses';

export const editAddress = async (
  values: AddressData,
  addressType: 'Billing' | 'Shipping',
  addressId: string,
  isNewAddress: boolean,
  updateAddresses: (
    addresses: Address[],
    defaultAddressId: string | null,
  ) => void,
) => {
  try {
    const user = localStorage.getItem(LocalStorageKeys.USER);
    const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
    if (user && version) {
      const { id } = JSON.parse(user);
      const result = isNewAddress
        ? ((await addCustomerAddress({
            ID: id,
            version,
            isDefault: values.isDefault,
            street: values.street,
            postalCode: values.postalCode,
            city: values.city,
            country: values.country,
            addressType,
          })) as ApiResponse)
        : ((await editCustomerAddress({
            ID: id,
            version,
            addressId,
            isDefault: values.isDefault,
            street: values.street,
            postal: values.postalCode,
            city: values.city,
            country: values.country,
            addressType,
          })) as ApiResponse);
      if (result) {
        userMessage(ToastTypes.SUCCESS, 'Address updated successfully.');
        const { body: customerData } = result;
        let addresses;
        let defaultAddressId;
        if (addressType === 'Shipping') {
          addresses = getShippingAddresses(customerData) || [];
          defaultAddressId = customerData.defaultShippingAddressId ?? '';
        } else {
          addresses = getBillingAddresses(customerData) || [];
          defaultAddressId = customerData.defaultBillingAddressId ?? '';
        }
        updateAddresses(addresses, defaultAddressId ?? null);
      }
    } else {
      throw new Error(
        'Something wrong with local storage. Login and try again.',
        {
          cause: 'LS',
        },
      );
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
      if (e.message.includes('version')) {
        throw new Error('Version error. Logout and try again.');
      }
      throw new Error(e.message);
    }
  }
};
