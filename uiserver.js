const express = require('express');
const proxy = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

const port = process.env.UI_SERVER_PORT;
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
const env = { UI_API_ENDPOINT };
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  console.log('Adding dev middlware, enabling HMR');
  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('./webpack.config.js');
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.use(express.static('public'));

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget }));
}

app.get('/env.js', function (req, res) {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.listen(port, function () {
  console.log(`UI server ready on ${port}`);
});
