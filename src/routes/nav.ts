import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/services/useAuth";
import { routes } from "./routes";
import { generateNav } from "./navUtil";
import type { RouteConfig } from "../api/models/routeConfigModel";

export const useNav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const nav = generateNav();

  const go = (routeName: string, params?: Record<string, any>) => {
    const route = routes.find((r) => r.name === routeName) as
      | RouteConfig
      | undefined;

    if (!route) {
      console.error(`Route "${routeName}" not found`);
      return;
    }

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

  const get = (routeName: string, params?: Record<string, any>) => {
    const routeGetter = nav[routeName];
    if (!routeGetter) {
      console.error(`Route "${routeName}" not found`);
      return null;
    }
    return routeGetter.get(params);
  };

  return { go, get };
};
