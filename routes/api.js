// EXPRESS ROUTES

const routes  = require('express').Router();
const logger  = require('../lib/logger')
const DATA_DIR = process.env.OPENSHIFT_DATA_DIR
var fs   = require('fs'),
    loki = require('lokijs'),
    options = { autosave: true, autoload: true,
        autosaveInterval: 1000}

routes.get('/games/:gameid', (req, res) => {
    var gameID = req.params.gameid
    var db_path = DATA_DIR+'/'+gameID+'.json';
    var db = new loki(db_path, options)
    db.loadDatabase({}, function(){
        players = db.getCollection('players')
        if (!players){
            db.addCollection('players')
            db.save()
        }
        res.status(200).json({ gameName: gameID });
    })
});

routes.get('/players/:gameid', (req, res) => {
    var gameID = req.params.gameid
    var db_path = DATA_DIR+'/'+gameID+'.json';
    var db = new loki(db_path, options)
    db.loadDatabase({}, function(){
        var data = db.getCollection('players').data
        res.status(200).json(data)
    })
});

module.exports = routes;