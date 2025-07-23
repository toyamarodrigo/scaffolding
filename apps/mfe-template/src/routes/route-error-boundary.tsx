import { useNavigate, useRouteError } from "react-router";
import { Layout } from "@/layout/layout";

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
  data?: unknown;
};

// Error component for route-level errors (loaders, navigation, etc.)
export function RouteErrorBoundary() {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  // Determine error type and message
  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: "404 - Página no encontrada",
        message: "La página que estás buscando no existe.",
        showRetry: false,
      };
    }

    if (error?.status === 500) {
      return {
        title: "500 - Server Error",
        message: "Algo salió mal en nuestro servidor. Por favor, intenta nuevamente.",
        showRetry: true,
      };
    }

    if (error?.status) {
      return {
        title: `${error.status} - ${error.statusText}`,
        message: error.message || "Ocurrió un error al cargar esta página.",
        showRetry: true,
      };
    }

    return {
      title: "Algo salió mal!",
      message: error?.message || "Ocurrió un error inesperado al navegar.",
      showRetry: true,
    };
  };

  const errorInfo = getErrorInfo();

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <Layout title={errorInfo.title}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">😞</div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {errorInfo.title}
            </h2>
            <p className="text-gray-600">
              {errorInfo.message}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={handleGoHome}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Volver a la página principal
            </button>

            {errorInfo.showRetry && (
              <button
                type="button"
                onClick={handleRetry}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Intentar nuevamente
              </button>
            )}
          </div>

          {/* Development error details */}
          {import.meta.env.DEV && error && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Detalles del error (Desarrollo)
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-800 overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </Layout>
  );
}
