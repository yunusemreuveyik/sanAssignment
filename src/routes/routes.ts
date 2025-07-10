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
    translations: ["loginPage.en.json", "loginPage.tr.json"],
  },
  {
    name: routeNames.home,
    path: "/",
    renderer: "lazy",
    component: lazy(() => import("../pages/homePage/homePage")),
    permissions: [],
    translations: ["homePage.en.json", "homePage.tr.json"],
  },
  {
    name: routeNames.posts,
    path: "/posts",
    renderer: "lazy",
    component: lazy(() => import("../pages/postListPage/postListPage")),
    permissions: ["VIEW_POSTS"],
    translations: ["postListPage.en.json", "postListPage.tr.json"],
  },
  {
    name: routeNames.post,
    path: "/posts/:id",
    renderer: "lazy",
    component: lazy(() => import("../pages/singlePostPage/singlePostPage")),
    permissions: ["VIEW_POSTS"],
    translations: ["singlePostPage.en.json", "singlePostPage.tr.json"],
  },
  {
    name: routeNames.createPost,
    path: "/create",
    renderer: "lazy",
    component: lazy(() => import("../pages//createPostPage/createPostPage")),
    permissions: ["CREATE_POST"],
    translations: ["createPostPage.en.json", "createPostPage.tr.json"],
  },
  {
    name: routeNames.forbidden,
    path: "/403",
    renderer: "element",
    component: lazy(() => import("../pages/403Page/403Page")),
    permissions: [],
    translations: ["403Page.en.json", "403Page.tr.json"],
  },
  {
    name: routeNames.notFound,
    path: "/404",
    renderer: "element",
    component: lazy(() => import("../pages/404Page/404Page")),
    permissions: [],
    translations: ["404Page.en.json", "404Page.tr.json"],
  },
];
