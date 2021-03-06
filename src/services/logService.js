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
/**
 * 
 * @param {string} message 
 */
export const logError = (message) => {
  toast.error(message, toastStyle);
};
/**
 * 
 * @param {string} message 
 */
export const showSuccessMessage = (message) => {
  toast.success(message, toastStyle);
  
};
/**
 * 
 * @param {string} message 
 */
export const infoMessage = (message) => {
  toast.info(message, toastStyle);
};
