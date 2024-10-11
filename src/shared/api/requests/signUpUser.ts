import { SubmitData } from '@/features/Registration';
import { apiRoot } from '../BuildClient';
import { countriesList } from '@/shared/const/Countries';

export async function signUpUser(
  props: SubmitData,
): Promise<unknown | undefined> {
  const {
    username,
    surname,
    password,
    email,
    shippingCountry,
    shippingCity,
    shippingStreet,
    shippingPostal,
    shippingIsDefault,
    billingCountry,
    billingCity,
    billingStreet,
    billingPostal,
    billingIsDefault,
    birthdate,
  } = props;
  const DEFAULT_SHIPPING_INDEX = 0;
  const DEFAULT_BILLING_INDEX = 1;

  const countryShippingAbbr = countriesList.find(
    ({ name }) => name === shippingCountry,
  )?.abbr;
  const countryBillingAbbr = countriesList.find(
    ({ name }) => name === billingCountry,
  )?.abbr;
  try {
    const result = await apiRoot
      .customers()
      .post({
        body: {
          email,
          password,
          addresses: [
            {
              country: countryShippingAbbr || '',
              city: shippingCity,
              streetName: shippingStreet,
              postalCode: shippingPostal,
            },
            {
              country: countryBillingAbbr || '',
              city: billingCity,
              streetName: billingStreet,
              postalCode: billingPostal,
            },
          ],
          shippingAddresses: [0],
          billingAddresses: [1],
          defaultShippingAddress: shippingIsDefault
            ? DEFAULT_SHIPPING_INDEX
            : undefined,
          defaultBillingAddress: billingIsDefault
            ? DEFAULT_BILLING_INDEX
            : undefined,
          firstName: username,
          lastName: surname,
          salutation: `Hello, ${username}!`,
          dateOfBirth: `${birthdate}`,
        },
      })
      .execute();

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const { message } = error;
      throw new Error(message);
    }
    return undefined;
  }
}
