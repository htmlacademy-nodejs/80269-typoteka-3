'use strict';

const {Router} = require(`express`);


const myRouter = new Router();

myRouter.get(`/`, (_req, res) => {
  res.send(`/my`);
});
myRouter.get(`/comments`, (_req, res) => {
  res.send(`/my/comments`);
});


module.exports = myRouter;
