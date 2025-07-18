import React, { useEffect, useState } from "react";
import type { RouteConfig } from "../api/models/routeConfigModel";
import { loadRouteResources } from "./loadRouteResources";
import Loader from "../components/loader/loader";

/**
 * RouteLoader blocks rendering until route resources (e.g. translations) are loaded.
 */
const RouteLoader: React.FC<{
  route: RouteConfig;
  children: React.ReactNode;
}> = ({ route, children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoaded(false); // ensure reset if route changes
      await loadRouteResources(route);
      if (isMounted) setLoaded(true);
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [route]);

  if (!loaded) return <Loader />;

  return <>{children}</>;
};

export default RouteLoader;
