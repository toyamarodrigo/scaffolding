import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateByKey: (key: string[]) => queryClient.invalidateQueries({ queryKey: key }),
    removeQueries: (key: string[]) => queryClient.removeQueries({ queryKey: key }),
    setQueryData: (key: string[], data: unknown) => queryClient.setQueryData(key, data),
  };
}
