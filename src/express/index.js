'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main.js`);
const myRoutes = require(`./routes/my.js`);


const DEFAULT_PORT = 8080;
const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server runs on port: ${DEFAULT_PORT}`);
});
