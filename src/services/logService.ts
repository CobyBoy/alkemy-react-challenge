import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyle: ToastOptions = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  pauseOnFocusLoss: false,
};

export const logError = (message:string): void => {
  toast.error(message, toastStyle);
};

export const showSuccessMessage = (message: string): void => {
  toast.success(message, toastStyle);
};

export const infoMessage = (message: string): void => {
  toast.info(message, toastStyle);
};
