export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
} as const;

export type ToastType = (typeof ToastType)[keyof typeof ToastType];

export const ToastPosition = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
} as const;

export type ToastPosition = (typeof ToastPosition)[keyof typeof ToastPosition];

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}
