import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true, // 🔥 always refetch on mount if stale
      staleTime: 30 * 1000, // 🔥 30 seconds before data is considered stale
    },
  },
});
