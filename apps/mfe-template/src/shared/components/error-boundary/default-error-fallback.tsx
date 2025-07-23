import type { FallbackProps } from "react-error-boundary";

// Default error fallback component
export const DefaultErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="error-fallback p-6 bg-red-50 border border-red-200 rounded-lg">
    <h2 className="text-xl font-semibold text-red-800 mb-2">Algo salió mal</h2>
    <p className="text-red-700 mb-4">
      Ocurrió un error en este componente. Por favor, intenta nuevamente.
    </p>

    {error && (
      <details className="mb-4">
        <summary className="cursor-pointer text-red-600 hover:text-red-800">
          Detalles del error
        </summary>
        <pre className="mt-2 p-3 bg-red-100 rounded text-sm text-red-800 overflow-auto">
          {error.message}
        </pre>
      </details>
    )}

    <div className="flex gap-2">
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Intentar nuevamente
      </button>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
      >
        Recargar página
      </button>
    </div>
  </div>
);
