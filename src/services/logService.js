import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyle = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  pauseOnFocusLoss: false,
};
export const logError = (message) => {
  toast.error(message, toastStyle);
};

export const showSuccessMessage = (message) => {
  toast.success(message, toastStyle);
};
