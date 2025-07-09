import { useNavigate } from "react-router-dom";
import { useAuth } from "./api/useAuth"; // Adjust if path differs
import type { RouteConfig } from "./models/routeConfigModel";
import { routes } from "./routes/routes";

type Params = Record<string, any>;

const nav = routes.reduce((acc, route) => {
  acc[route.name] = {
    get: (params?: Params) => {
      let path = route.path;
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          path = path.replace(`:${key}`, value);
        });
      }
      return path;
    },
  };
  return acc;
}, {} as Record<string, { get: (params?: Params) => string }>);

// ✅ Custom hook to navigate with permission checking
export const useNav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const go = (routeName: string, params?: Record<string, any>) => {
    const route = routes.find((r) => r.name === routeName) as
      | RouteConfig
      | undefined;

    if (!route) {
      console.error(`Route "${routeName}" not found`);
      return;
    }

    // 🔥 Only check permissions if the route has defined permissions
    if (
      route.permissions &&
      route.permissions.length > 0 &&
      !route.permissions.every((p) => user?.permissions.includes(p))
    ) {
      navigate("/403");
      return;
    }

    navigate(nav[routeName].get(params));
  };

  return { go, get: nav };
};
