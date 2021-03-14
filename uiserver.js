const express = require('express');
const proxy = require('http-proxy-middleware');
require('dotenv').config();

const port = process.env.UI_SERVER_PORT;
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
const env = { UI_API_ENDPOINT };

const app = express();

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
