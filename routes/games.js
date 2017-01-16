const routes = require('express').Router();

routes.get('/:gameid', (req, res) => {
    //todo: check if the appropriate game id has been logged
    res.status(200).json({ "gameid": req.params.gameid});
});

module.exports = routes;