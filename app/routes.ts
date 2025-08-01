// app/routes.ts
import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("launch", "routes/launch.tsx"),
] satisfies RouteConfig;