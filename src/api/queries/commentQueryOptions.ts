import { queryOptions } from "@tanstack/react-query";
import { fetchComments } from "../comments";

export const commentsQueryOptions = queryOptions({
  queryKey: ["comments"],
  queryFn: fetchComments,
});
