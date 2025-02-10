export const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? "/home/claudio/Documenti/Programmazione/React/acc-server-web/"
    : "/app/";

export const CONFIG_FOLDER =
  process.env.NODE_ENV === "development" ? "personal-cfg" : "acc-server/cfg";

export const CONFIG_PATH = `${BASE_PATH}${CONFIG_FOLDER}`;
