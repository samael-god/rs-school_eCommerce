import { apiRoot } from '../BuildClient';
import { countriesList } from '@/shared/const/Countries';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { setLocalStorageValue } from '@/shared/util/LocalStorageHandler';

interface EditAddressProps {
  ID: string;
  version: number;
  addressType: 'Shipping' | 'Billing';
  addressId: string;
  country: string;
  city: string;
  postal: string;
  street: string;
  isDefault: boolean;
}

export async function editCustomerAddress(
  props: EditAddressProps,
): Promise<unknown> {
  const {
    ID,
    version,
    addressId,
    country,
    city,
    postal,
    street,
    isDefault,
    addressType,
  } = props;
  const countryAbbr =
    countriesList.find(({ name }) => name === country)?.abbr ?? '';

  try {
    let response = await apiRoot
      .customers()
      .withId({ ID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeAddress',
              addressId,
              address: {
                country: countryAbbr,
                city,
                postalCode: postal,
                streetName: street,
              },
            },
          ],
        },
      })
      .execute();
    setLocalStorageValue(response.body.version);
    if (isDefault) {
      const newVersion = Number(localStorage.getItem(LocalStorageKeys.VERSION));
      response = await apiRoot
        .customers()
        .withId({ ID })
        .post({
          body: {
            version: newVersion,
            actions: [
              {
                action: `setDefault${addressType}Address`,
                addressId,
              },
            ],
          },
        })
        .execute();
      setLocalStorageValue(response.body.version);
    }
    return response;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return undefined;
}
