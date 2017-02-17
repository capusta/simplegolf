// EXPRESS ROUTES

const routes = require('express').Router();
const logger = require('../lib/logger')

routes.get('/game/:gameid', (req, res) => {
    //todo: check if the appropriate game id has been logged
    if(req.params.gameid == 'bad'){
        res.status(400).json({ error: true });
    } else {
        res.status(200).json({ gameName: req.params.gameid, error: false });
    }
});

module.exports = routes;