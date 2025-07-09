import type { LazyExoticComponent } from "react";
import type { Permission } from "./userModel";

export interface RouteConfig {
  name: string;
  path: string;
  renderer: "element" | "lazy";
  component: React.ElementType | LazyExoticComponent<React.ComponentType<any>>;
  permissions?: Permission[];
  translations?: string[]; // placeholder for i18n
}
