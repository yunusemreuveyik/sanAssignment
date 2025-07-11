import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Toast from "../../components/toaster/toast";
import { ToastType, ToastPosition, type ToastItem } from "../models/toastModel";

interface ToastContextType {
  triggerToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider: React.FC<{
  children: ReactNode;
  position?: ToastPosition;
}> = ({ children, position = ToastPosition.TOP_RIGHT }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const triggerToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      <div className={`toast-container ${position}`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
