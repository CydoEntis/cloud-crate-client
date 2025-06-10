import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("auth", [
    route("login", "routes/login.tsx"),
    // route("register", "routes/regiter.tsx"),
  ]),
  layout("routes/sidebar.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("buckets", "routes/buckets.tsx"),
    route("files", "routes/files.tsx"),
    route("file/:fileId", "routes/file.tsx"),
  ]),
] satisfies RouteConfig;
