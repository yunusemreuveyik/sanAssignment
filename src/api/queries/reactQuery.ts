import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true, // 🔥 always refetch on mount if stale
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
