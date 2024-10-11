import { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '@/shared/api/BuildClient';

export async function getCustomer(ID: string): Promise<Customer | undefined> {
  try {
    const result = await apiRoot.customers().withId({ ID }).get().execute();
    return result.body;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Failed to fetch') {
        throw new Error('Server error. Try again later!', {
          cause: 'ServerError',
        });
      }

      if (e.message.includes('URI not found')) {
        throw new Error('The user doesnt exist!', {
          cause: 'ServerCustomerError',
        });
      }
      if (e.message) {
        throw new Error(
          'Some error occurred while fetching customer details.',
          {
            cause: 'UnknownError',
          },
        );
      }
    }
    return undefined;
  }
}
