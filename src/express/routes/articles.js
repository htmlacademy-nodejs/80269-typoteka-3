'use strict';

const {Router} = require(`express`);


const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => {
  res.render(`new-post`);
});
articlesRouter.get(`/category/:id`, (_req, res) => {
  res.render(`articles-by-category`);
});
articlesRouter.get(`/edit/:id`, (req, res) => {
  res.render(`edit-post`);
});
articlesRouter.get(`/:id`, (_req, res) => {
  res.render(`post`);
  // res.send(`/articles/${req.params.id}`);
});


module.exports = articlesRouter;
