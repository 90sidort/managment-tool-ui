const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.UI_SERVER_PORT;
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
const env = { UI_API_ENDPOINT };

app.use(express.static("public"));

app.get("/env.js", function (req, res) {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.listen(port, function () {
  console.log(`UI server ready on ${port}`);
});
