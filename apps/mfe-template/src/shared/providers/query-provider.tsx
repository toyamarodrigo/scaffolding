import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

type QueryProviderProps = {
  children: React.ReactNode;
};

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
