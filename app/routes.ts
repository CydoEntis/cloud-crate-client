import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("buckets", "routes/buckets.tsx"),
  route("files", "routes/files.tsx"),
  route("file/:fileId", "routes/file.tsx"),
] satisfies RouteConfig;
