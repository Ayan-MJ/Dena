import toast from 'react-hot-toast';

export const useNotify = () => {
  const success = (message: string) => {
    toast.success(message, {
      style: {
        background: '#f0fdf4',
        color: '#15803d',
        border: '1px solid #bbf7d0',
      },
    });
  };

  const error = (message: string) => {
    toast.error(message, {
      style: {
        background: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca',
      },
    });
  };

  return { success, error };
}; 