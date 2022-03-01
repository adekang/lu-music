import { viteVConsole } from "vite-plugin-vconsole";
import * as path from "path";

/**
 * @description 对eslint的支持，在开发模式下，自动会开启检测
 */
export default function configConsole() {
  return viteVConsole({
    entry: path.resolve("src/main.tsx"), // or you can use entry: [path.resolve('src/main.ts')]
    localEnabled: true,
    enabled: true,
    config: {
      maxLogNumber: 1000,
      theme: "dark"
    }
  });
}
