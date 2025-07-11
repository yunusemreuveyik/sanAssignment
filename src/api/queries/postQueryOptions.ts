import { queryOptions } from "@tanstack/react-query";
import { fetchPosts } from "../services/posts";

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});
