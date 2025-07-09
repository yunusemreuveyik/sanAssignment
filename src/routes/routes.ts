import { lazy } from "react";
import type { RouteConfig } from "../models/routeConfigModel";

export const routeNames = {
  login: "login",
  home: "home",
  posts: "posts",
  post: "post",
  editPost: "editPost",
  createPost: "createPost",
  notFound: "404",
  forbidden: "403",
};

export const routePaths = {
  login: "/login",
  home: "/",
  postsList: "/posts",
  createPost: "/create",
};

export const routes: RouteConfig[] = [
  {
    name: routeNames.login,
    path: "/login",
    renderer: "element",
    component: lazy(() => import("../pages/loginPage/loginPage")),
  },
  {
    name: routeNames.home,
    path: "/",
    renderer: "lazy",
    component: lazy(() => import("../pages/homePage/homePage")),
    permissions: ["VIEW_POSTS", "VIEW_COMMENTS"],
  },
  {
    name: routeNames.posts,
    path: "/posts",
    renderer: "lazy",
    component: lazy(() => import("../pages/postListPage/postListPage")),
    permissions: ["VIEW_POSTS"],
  },
  {
    name: routeNames.post,
    path: "/posts/:id",
    renderer: "lazy",
    component: lazy(() => import("../pages/singlePostPage/singlePostPage")),
    permissions: ["VIEW_POSTS"],
  },
  {
    name: routeNames.editPost,
    path: "/posts/:id/edit",
    renderer: "lazy",
    component: lazy(() => import("../pages/editPostPage/editPostPage")),
    permissions: ["EDIT_POST"],
  },
  {
    name: routeNames.createPost,
    path: "/create",
    renderer: "lazy",
    component: lazy(() => import("../pages//createPostPage/createPostPage")),
    permissions: ["CREATE_POST"],
  },
  {
    name: routeNames.forbidden,
    path: "/403",
    renderer: "element",
    component: lazy(() => import("../pages/404Page/404Page")),
  },
];
