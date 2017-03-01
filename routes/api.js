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

routes.put('/players/:gameid', (req,res) => {
    console.log("body" + JSON.stringify(req.body))
    var gameID     = req.params.gameid,
        oldname    = req.body.oldname,
        newname    = req.body.newname,
        db_path    = DATA_DIR+'/'+gameID+'.json',
        db         = new loki(db_path,options)
    db.loadDatabase({}, function(){
        var players   = db.getCollection('players');
        var oldPlayer = players.findOne({'name': oldname})
        console.log("found old player" + JSON.stringify(oldPlayer))
        if (oldPlayer) {
            oldPlayer.name = newname;
            players.update(oldPlayer)
        } else {
            players.insert({name: newname, score: 0});
        }
        db.save()
        res.status(200).json({success: true, name: newname, msg: 'inserted'})
    })
})

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