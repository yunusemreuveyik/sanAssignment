// src/hooks/useAuth.ts
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../models/userModel";

const USER: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  permissions: ["VIEW_POSTS", "VIEW_COMMENTS"],
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const login = () => {
    queryClient.setQueryData(["user"], USER);
  };

  const logout = () => {
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  const user = queryClient.getQueryData<User>(["user"]);
  return { user, login, logout };
};
