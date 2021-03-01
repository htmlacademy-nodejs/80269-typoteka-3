'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main.js`);


const DEFAULT_PORT = 8080;
const app = express();

app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server runs on port: ${DEFAULT_PORT}`);
});
