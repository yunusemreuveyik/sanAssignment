import { routes } from "./routes";
import type { User, Permission } from "../api/models/userModel";

export const findRouteByPath = (path: string) => {
  // Loop through all routes to find a match
  return routes.find((route) => {
    if (route.path === path) return true;

    // Handle dynamic segments like :id
    const routeParts = route.path.split("/");
    const pathParts = path.split("/");

    if (routeParts.length !== pathParts.length) return false;

    return routeParts.every((part, index) => {
      return part.startsWith(":") || part === pathParts[index];
    });
  });
};

export const hasPermission = (
  user: User | null | undefined,
  required: Permission[] = [],
  mode: "any" | "all" = "any"
): boolean => {
  if (!required.length) return true;
  if (!user || !user.permissions) return false;

  return mode === "all"
    ? required.every((perm) => user.permissions.includes(perm))
    : required.some((perm) => user.permissions.includes(perm));
};

export const canAccessRoute = (
  user: User | null | undefined,
  routePath: string
): boolean => {
  const route = findRouteByPath(routePath);

  if (!route) {
    console.warn(`Route not found for path: ${routePath}`);
    return false;
  }

  const requiredPerms = route.permissions as Permission[] | undefined;

  if (!requiredPerms || requiredPerms.length === 0) {
    return true; // public route
  }

  return hasPermission(user, requiredPerms, "all");
};
