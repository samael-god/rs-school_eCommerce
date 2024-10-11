import { toast } from 'react-toastify';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';

import {
  ToastConfig,
  ToastTypes,
  userMessage,
} from '@/shared/const/ToastConfig';
import { updateCustomerPassword } from '@/shared/api/requests/updatePassword';

interface FormData {
  oldPassword: string;
  newPassword: string;
}
export const UpdatePassword = async (
  formData: FormData,
  closeModal: () => void,
  navigate: (path: string) => void,
) => {
  try {
    const { oldPassword, newPassword } = formData;
    const user = localStorage.getItem(LocalStorageKeys.USER);
    const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
    if (user && version) {
      const { id } = JSON.parse(user);
      const ProfileData = {
        ID: id,
        oldPassword,
        newPassword,
        version,
      };
      const result = await updateCustomerPassword(ProfileData);
      if (result) {
        toast.success('Password Updated!', ToastConfig);
        closeModal();
      }
    } else {
      userMessage(
        ToastTypes.ERROR,
        'Something wrong with local storage. Login and try again.',
      );
      navigate('/main');
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('version')) {
        toast.error('Version error. Logout and try again.', ToastConfig);
      } else {
        toast.error(error.message, ToastConfig);
      }
    }
  }
};
