'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRoutes = require(`./routes/main.js`);
const myRoutes = require(`./routes/my.js`);
const articlesRoutes = require(`./routes/articles.js`);
const HttpCode = require(`../constants.js`).HttpCode;


const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;
const app = express();

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).render(`errors/404`);
});
app.use((_err, _req, res, _next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Server runs on port: ${DEFAULT_PORT}`);
});
