import type { ErrorInfo, ReactNode } from "react";
import type { FallbackProps } from "react-error-boundary";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSpinner } from "../loading-spinner";
import { DefaultErrorFallback } from "./default-error-fallback";
import { handleError } from "./utils/handle-error";

// Module-specific error boundary with Suspense
export const ModuleErrorBoundary: React.FC<{
  children: ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}> = ({
  children,
  fallback: FallbackComponent = DefaultErrorFallback,
  onError = handleError,
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={onError}
      onReset={() => {
        // Clear any application state that needs resetting
        // For example, clear error states, reset forms, etc.
        console.log("Error boundary reset");
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
