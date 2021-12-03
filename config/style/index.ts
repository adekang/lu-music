import { CSSOptions } from 'vite';

/**
 * @description css样式配置
 */
const cssOption: CSSOptions = {
  modules: {
    generateScopedName: '[name]_[local]_[hash:base64:5]',
    hashPrefix: 'prefix',
    localsConvention: 'camelCase',
  },
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
    },
    scss: {
      additionalData: '@import "./src/assets/scss/varible.scss";',
    },
  },
};
export default cssOption;
