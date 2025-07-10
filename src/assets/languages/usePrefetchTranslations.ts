import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { prefetchTranslation } from "./translationsPrefetch";
import { routes } from "../../routes/routes";

export const usePrefetchTranslations = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find((route) =>
      matchPath(route.path, location.pathname)
    );

    if (currentRoute && currentRoute.translations) {
      currentRoute.translations.forEach((file) => {
        prefetchTranslation(file);
      });
    }
  }, [location.pathname]);
};

/**
 * Basic match function handling dynamic segments.
 */
const matchPath = (routePath: string, currentPath: string) => {
  const routeParts = routePath.split("/");
  const currentParts = currentPath.split("/");

  if (routeParts.length !== currentParts.length) return false;

  return routeParts.every((part, index) => {
    return part.startsWith(":") || part === currentParts[index];
  });
};
