import { Bounce, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};

export enum ToastMessage {
  SUCCESS_UPDATE = 'Data was successfully updated!',
  UNKNOWN_ERROR = 'Whops, some error occurred!',
}
export enum ToastTypes {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const userMessage = (toastType: ToastTypes, message: string) => {
  return toastType === ToastTypes.SUCCESS
    ? toast.success(message, ToastConfig)
    : toast.error(message, ToastConfig);
};
