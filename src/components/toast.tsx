import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils.js";

/**
 * Toast provider component. Wrap your app with this to enable toasts.
 */
const ToastProvider = ToastPrimitives.Provider;

/**
 * Toast viewport component props.
 */
export interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {}

/**
 * The viewport where toasts appear.
 */
const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Viewport>, ToastViewportProps>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border border-gray-200 bg-white text-gray-900",
        danger: "danger group border-red-500 bg-red-500 text-white",
        success: "success group border-green-500 bg-green-500 text-white",
        info: "info group border-blue-500 bg-blue-500 text-white",
        warning: "warning group border-yellow-500 bg-yellow-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Toast component props.
 */
export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, VariantProps<typeof toastVariants> {}

/**
 * A toast notification component built on Radix UI Toast.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <Toast>
 *     <ToastTitle>Toast Title</ToastTitle>
 *     <ToastDescription>Toast description</ToastDescription>
 *     <ToastClose />
 *   </Toast>
 *   <ToastViewport />
 * </ToastProvider>
 * ```
 */
const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastProps>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * Toast action component props.
 */
export interface ToastActionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> {}

/**
 * An action button in a toast.
 */
const ToastAction = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Action>, ToastActionProps>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "focus:ring-primary-400 inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:ring-1 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      "group-[.danger]:border-red-300 group-[.danger]:text-white group-[.danger]:hover:bg-red-600",
      "group-[.success]:border-green-300 group-[.success]:text-white group-[.success]:hover:bg-green-600",
      "group-[.info]:border-blue-300 group-[.info]:text-white group-[.info]:hover:bg-blue-600",
      "group-[.warning]:border-yellow-300 group-[.warning]:text-white group-[.warning]:hover:bg-yellow-600",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Toast close component props.
 */
export interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> {}

/**
 * Close button for a toast.
 */
const ToastClose = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Close>, ToastCloseProps>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "focus:ring-primary-400 absolute top-1 right-1 rounded-md p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-600 focus:opacity-100 focus:ring-1 focus:outline-none",
      "group-[.danger]:text-red-200 group-[.danger]:hover:text-white group-[.danger]:focus:ring-red-300",
      "group-[.success]:text-green-200 group-[.success]:hover:text-white group-[.success]:focus:ring-green-300",
      "group-[.info]:text-blue-200 group-[.info]:hover:text-white group-[.info]:focus:ring-blue-300",
      "group-[.warning]:text-yellow-200 group-[.warning]:hover:text-white group-[.warning]:focus:ring-yellow-300",
      className,
    )}
    toast-close=""
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * Toast title component props.
 */
export interface ToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> {}

/**
 * Title text in a toast.
 */
const ToastTitle = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Title>, ToastTitleProps>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold [&+div]:text-xs", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Toast description component props.
 */
export interface ToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> {}

/**
 * Description text in a toast.
 */
const ToastDescription = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Description>, ToastDescriptionProps>(
  ({ className, ...props }, ref) => <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />,
);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export { type ToastActionElement, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };
