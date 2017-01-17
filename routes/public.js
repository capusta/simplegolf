const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.status(200).render('index', {thing: 'World'});
});

routes.get('/about', (req, res) => {
  res.status(200).json({ status: 'about section' });
});

module.exports = routes;