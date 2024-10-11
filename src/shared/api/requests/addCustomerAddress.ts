import { apiRoot } from '../BuildClient';
import { countriesList } from '@/shared/const/Countries';
import { setLocalStorageValue } from '@/shared/util/LocalStorageHandler';

interface AddAddressProps {
  ID: string;
  version: number;
  addressType: 'Shipping' | 'Billing';
  country: string;
  city: string;
  postalCode: string;
  street: string;
  isDefault: boolean;
}

export async function addCustomerAddress(
  props: AddAddressProps,
): Promise<unknown> {
  const {
    ID,
    version,
    addressType,
    country,
    city,
    postalCode,
    street,
    isDefault,
  } = props;
  const countryAbbr =
    countriesList.find((el) => el.name === country)?.abbr || '';

  try {
    let response = await apiRoot
      .customers()
      .withId({ ID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addAddress',
              address: {
                country: countryAbbr,
                city,
                postalCode,
                streetName: street,
              },
            },
          ],
        },
      })
      .execute();
    setLocalStorageValue(response.body.version);

    const { body } = response;
    const { version: newVersion, addresses } = body;
    const newAddressId = addresses[addresses.length - 1].id;

    response = await apiRoot
      .customers()
      .withId({ ID })
      .post({
        body: {
          version: newVersion,
          actions: [
            {
              action: `add${addressType}AddressId`,
              addressId: newAddressId,
            },
          ],
        },
      })
      .execute();
    setLocalStorageValue(response.body.version);

    if (isDefault) {
      response = await apiRoot
        .customers()
        .withId({ ID })
        .post({
          body: {
            version: response.body.version,
            actions: [
              {
                action: `setDefault${addressType}Address`,
                addressId: newAddressId,
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
