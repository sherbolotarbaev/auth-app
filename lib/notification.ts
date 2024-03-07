import { toast } from "sonner";

export const errorNotification = (msg: string) => {
  return toast.error(msg, {
    duration: 2500,
    position: "bottom-center",
  });
};

export const successNotification = (msg: string) => {
  return toast.success(msg, {
    duration: 2500,
    position: "bottom-center",
  });
};
