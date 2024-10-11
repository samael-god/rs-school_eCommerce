import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { updateCustomerInfo } from '@/shared/api/requests/updateCustomerInfo';
import {
  ToastMessage,
  ToastTypes,
  userMessage,
} from '@/shared/const/ToastConfig';

interface FormData {
  username: string;
  email: string;
  surname: string;
  birthdate: string;
}
export const UpdateCustomer = async (
  formData: FormData,
  updateState: (newState: boolean) => void,
  navigate: (path: string) => void,
) => {
  try {
    const LSUser = localStorage.getItem(LocalStorageKeys.USER);
    const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
    if (LSUser && version) {
      const { id } = JSON.parse(LSUser);
      const ProfileData = {
        ID: id,
        email: formData.email,
        firstName: formData.username,
        lastName: formData.surname,
        dateOfBirth: formData.birthdate,
        version,
      };
      const result = await updateCustomerInfo(ProfileData);
      if (result) {
        userMessage(ToastTypes.SUCCESS, ToastMessage.SUCCESS_UPDATE);
        updateState(false);
      }
    } else {
      userMessage(
        ToastTypes.ERROR,
        'Something wrong with local storage. Login and try again.',
      );
      navigate('/main');
    }
  } catch (error) {
    let errorMessage = '';
    if (error instanceof Error) {
      switch (error.cause) {
        case 409: {
          errorMessage = 'Error occurred! Wrong client version.';
          break;
        }
        default: {
          errorMessage = error.message;
          break;
        }
      }
      userMessage(ToastTypes.ERROR, errorMessage || ToastMessage.UNKNOWN_ERROR);
    }
  }
};
