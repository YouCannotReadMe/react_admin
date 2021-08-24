const CracoLessPlugin = require('craco-less');
const decorators = require('@babel/plugin-proposal-decorators')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: decorators,
      options:{
          "legacy": true
      }
    }
  ],
};