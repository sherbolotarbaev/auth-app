import { toast } from 'sonner';

export const errorNotification = (msg: string) => {
  return toast.error(msg, {
    duration: 4500,
    position: 'top-center',
  });
};

export const successNotification = (msg: string) => {
  return toast.success(msg, {
    duration: 4500,
    position: 'top-center',
  });
};
