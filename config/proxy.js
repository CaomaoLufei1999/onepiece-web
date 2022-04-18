/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      // target: 'https://preview.pro.ant.design',
      target: 'https://office-cn-hangzhou.imm.aliyuncs.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      // target: 'https://proapi.azurewebsites.net',
      target: 'https://office-cn-hangzhou.imm.aliyuncs.com',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      // https://office-cn-hangzhou.imm.aliyuncs.com/office/f/16177ae32a1b20df467f0556414fa2849993ffef?_w_tokentype=1&hidecmb=1&simple=1
      target: 'https://office-cn-hangzhou.imm.aliyuncs.com',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
