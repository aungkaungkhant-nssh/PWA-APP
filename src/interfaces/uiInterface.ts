import { RouteProps } from "react-router";

export interface AlertBoxProps {
    trigger: string;
    header?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export interface ToastBoxProps {
    trigger: string;
    message: string;
    duration?: number;
    color?: string;
    position?: "top" | "bottom" | "middle";
    icon?: string;
}


export interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<object>;
    isAuthenticated: boolean;
}


export interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

