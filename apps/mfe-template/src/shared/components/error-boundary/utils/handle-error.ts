import type { ErrorInfo } from "react";

// Enhanced error handler
export function handleError(error: Error, errorInfo: ErrorInfo) {
  console.error("ErrorBoundary caught an error:", error, errorInfo);

  // You can add error reporting here (e.g., Sentry, LogRocket, etc.)
  // errorReportingService.captureException(error, { extra: errorInfo });
}
