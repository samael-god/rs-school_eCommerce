import { Customer, ClientResponse } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';
import { setLocalStorageValue } from '@/shared/util/LocalStorageHandler';

interface UpdateCustomerInfoProps {
  ID: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  version: number;
}

export async function updateCustomerInfo(
  props: UpdateCustomerInfoProps,
): Promise<ClientResponse<Customer> | undefined> {
  try {
    const { ID, email, firstName, lastName, dateOfBirth, version } = props;
    const response = await apiRoot
      .customers()
      .withId({ ID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeEmail',
              email,
            },
            {
              action: 'setFirstName',
              firstName,
            },
            {
              action: 'setLastName',
              lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth,
            },
          ],
        },
      })
      .execute();
    setLocalStorageValue(response.body.version);
    return response;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Failed to fetch') {
        throw new Error('Server Error! Try again later.', {
          cause: 'ServerError',
        });
      }
      if (e.message.includes('version')) {
        throw new Error('', {
          cause: 409,
        });
      }
      if (e.message) {
        throw new Error(e.message);
      }
    }
    return undefined;
  }
}
