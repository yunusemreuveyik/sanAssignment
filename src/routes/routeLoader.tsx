import React, { useEffect, useState } from "react";
import type { RouteConfig } from "../models/routeConfigModel";
import { loadRouteResources } from "./loadRouteResources";

/**
 * RouteLoader component is responsible for loading the necessary resources
 * for a given route before rendering its children. This is useful for routes
 * that require translations or other resources to be loaded dynamically.
 */
const RouteLoader: React.FC<{
  route: RouteConfig;
  children: React.ReactNode;
}> = ({ route, children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    loadRouteResources(route).then(() => {
      if (isMounted) setLoaded(true);
    });
    return () => {
      isMounted = false;
    };
  }, [route]);

  if (!loaded) return <div>Loading...</div>;

  return <>{children}</>;
};

export default RouteLoader;
