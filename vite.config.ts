import { defineConfig } from "vite";
import * as path from "path";
import { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_OPEN } from "./config";
import createVitePlugins from "./config/plugins";
import cssOption from "./config/style";
import proxy from "./config/setupProxy";
import build from "./config/build";

export default defineConfig(configEnv => {
  console.log(`config::`, configEnv);
  const { command, mode } = configEnv;
  // const isBuild = command === 'build';
  return {
    base: VITE_APP_BASE,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    plugins: createVitePlugins(command, mode),
    css: cssOption,
    server: {
      host: false,
      port: VITE_APP_PORT,
      open: VITE_APP_OPEN,
      proxy
    },
    build,
  };
});
