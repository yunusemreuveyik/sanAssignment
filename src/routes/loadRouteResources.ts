import { prefetchTranslation } from "../assets/languages/translationsPrefetch";
import type { RouteConfig } from "../models/routeConfigModel";

export const loadRouteResources = async (route: RouteConfig) => {
  if (route.translations) {
    await Promise.all(
      route.translations.map((file) => prefetchTranslation(file))
    );
  }
};
