const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!!!' });
});

routes.get('/about', (req, res) => {
  res.status(200).json({ status: 'about section' });
});

module.exports = routes;