import { prefetchTranslation } from "../assets/languages/translationsPrefetch";
import type { RouteConfig } from "../models/routeConfigModel";

export const loadRouteResources = async (route: RouteConfig) => {
  if (route.translations && route.translations.length > 0) {
    await Promise.all(
      route.translations.map((file) => prefetchTranslation(file))
    );
  }
};
