const routes = require('express').Router();
const logger = require('../lib/logger')

routes.get('/game/:gameid', (req, res) => {
    //todo: check if the appropriate game id has been logged
    res.status(200).json({ "game_id": req.params.gameid, status: false});
});

module.exports = routes;