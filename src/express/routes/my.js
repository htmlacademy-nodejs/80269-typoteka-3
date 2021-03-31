'use strict';

const {Router} = require(`express`);


const myRouter = new Router();

myRouter.get(`/`, (_req, res) => {
  res.render(`my`);
});
myRouter.get(`/comments`, (_req, res) => {
  res.render(`comments`);
});


module.exports = myRouter;
