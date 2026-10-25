import path from "node:path";

export const BASE_PATH =
  process.env.ACC_BASE_PATH ||
  (process.env.NODE_ENV === "development" ? process.cwd() : "/app");
export const CONFIG_FOLDER =
  process.env.NODE_ENV === "development" ? "personal-cfg" : "acc-server/cfg";
export const CONFIG_PATH =
  process.env.ACC_CONFIG_PATH || path.join(BASE_PATH, CONFIG_FOLDER);
export const RESULTS_PATH =
  process.env.ACC_RESULTS_PATH || path.join(BASE_PATH, "acc-server", "results");
export const LOG_PATH =
  process.env.ACC_LOG_PATH || path.join(BASE_PATH, "wine.log");
