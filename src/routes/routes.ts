import { lazy } from "react";
import type { RouteConfig } from "../models/routeConfigModel";

export const routes: RouteConfig[] = [
  {
    name: "login",
    path: "/login",
    renderer: "element",
    component: lazy(() => import("../pages/loginPage/loginPage")),
  },
  {
    name: "home",
    path: "/",
    renderer: "lazy",
    component: lazy(() => import("../pages/homePage/homePage")),
    permissions: ["VIEW_POSTS", "VIEW_COMMENTS"],
  },
  {
    name: "posts",
    path: "/posts",
    renderer: "lazy",
    component: lazy(() => import("../pages/postListPage/postListPage")),
    permissions: ["VIEW_POSTS"],
  },
  {
    name: "post",
    path: "/posts/:id",
    renderer: "lazy",
    component: lazy(() => import("../pages/singlePostPage/singlePostPage")),
    permissions: ["VIEW_POSTS"],
  },
  {
    name: "editPost",
    path: "/posts/:id/edit",
    renderer: "lazy",
    component: lazy(() => import("../pages/editPostPage/editPostPage")),
    permissions: ["EDIT_POST"],
  },
  {
    name: "createPost",
    path: "/create",
    renderer: "lazy",
    component: lazy(() => import("../pages//createPostPage/createPostPage")),
    permissions: ["CREATE_POST"],
  },
  {
    name: "403",
    path: "/403",
    renderer: "element",
    component: lazy(() => import("../pages/404Page/404Page")),
  },
];
