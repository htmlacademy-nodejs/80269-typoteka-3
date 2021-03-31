'use strict';

const {Router} = require(`express`);


const mainRouter = new Router();

mainRouter.get(`/`, (_req, res) => {
  res.render(`main`);
});
mainRouter.get(`/register`, (_req, res) => {
  res.render(`sign-up`);
});
mainRouter.get(`/login`, (_req, res) => {
  res.render(`login`);
});
mainRouter.get(`/search`, (_req, res) => {
  res.render(`search`);
});
mainRouter.get(`/categories`, (req, res) => {
  res.send(`/categories`);
});


module.exports = mainRouter;
