export type Permission =
  | "VIEW_POSTS"
  | "VIEW_COMMENTS"
  | "EDIT_POST"
  | "CREATE_POST";

export interface User {
  name: string;
  email: string;
  id: string;
  permissions: Permission[];
  // Add more fields as your app grows, e.g., avatar, createdAt, etc.
}
