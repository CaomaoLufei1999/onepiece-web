// https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {}
  },
  scripts: [
    'https://unpkg.com/react@17/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts.min.js',
    // 使用 组织架构图、流程图、资金流向图、缩进树图 才需要使用
    'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts_g6.min.js',
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    "@ant-design/charts": "charts"
  },
});
