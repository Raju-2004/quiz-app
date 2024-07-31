import { ToastOptions, toast } from 'react-toastify'
export const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

export const notifySuccess = (message: string) => toast.success(message, toastConfig)
export const notifyWarn = (errorMessage: string) => toast.warn(errorMessage, toastConfig)
export const notifyError = (warnMessage: string) => toast.error(warnMessage, toastConfig)
