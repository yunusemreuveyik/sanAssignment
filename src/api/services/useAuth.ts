import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../models/userModel";

const USER: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  permissions: [
    "VIEW_POSTS",
    "VIEW_COMMENTS",
    "EDIT_POST",
    "DELETE_POST",
    "CREATE_POST",
  ],
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const cachedUser = queryClient.getQueryData<User>(["user"]);
      if (cachedUser) return cachedUser;
      return null;
    },
  });

  const login = async () => {
    queryClient.setQueryData(["user"], USER);
  };

  const logout = () => {
    queryClient.removeQueries(); // removes all cached queries
    queryClient.clear(); // completely clears cache including mutations

    // If you also have React Query persister:
    localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
  };

  return { user, login, logout };
};
