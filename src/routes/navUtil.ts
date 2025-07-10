import type { Params } from "react-router-dom";
import { routes } from "./routes";

export const generateNav = () => {
  return routes.reduce((acc, route) => {
    acc[route.name] = {
      get: (params?: Params) => {
        let path = route.path;
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            path = path.replace(`:${key}`, String(value));
          });
        }
        return path;
      },
    };
    return acc;
  }, {} as Record<string, { get: (params?: Params) => string }>);
};
