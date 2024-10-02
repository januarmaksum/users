import { toast, ToastOptions } from "react-hot-toast";

const useToast = () => {
  const showToast = {
    dismiss: () => {
      toast.remove();
    },
    success: (message: string, options?: ToastOptions) => {
      toast.success(message, {
        style: {
          border: "1px solid #10B981",
          padding: "16px",
          color: "#10B981",
        },
        iconTheme: {
          primary: "#10B981",
          secondary: "#FFFBEB",
        },
        ...options,
      });
    },
    error: (message: string, options?: ToastOptions) => {
      toast.error(message, {
        style: {
          border: "1px solid #EF4444",
          padding: "16px",
          color: "#EF4444",
        },
        iconTheme: {
          primary: "#EF4444",
          secondary: "#FFFBEB",
        },
        ...options,
      });
    },
  };

  return showToast;
};

export default useToast;
