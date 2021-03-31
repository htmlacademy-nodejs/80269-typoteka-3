'use strict';

const {Router} = require(`express`);


const mainRouter = new Router();

mainRouter.get(`/`, (_req, res) => {
  res.render(`main`);
});
mainRouter.get(`/register`, (_req, res) => {
  throw new Error();
  res.send(`/register`);
});
mainRouter.get(`/login`, (req, res) => {
  res.send(`/login`);
});
mainRouter.get(`/search`, (req, res) => {
  res.send(`/search`);
});
mainRouter.get(`/categories`, (req, res) => {
  res.send(`/categories`);
});


module.exports = mainRouter;
