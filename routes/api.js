// EXPRESS ROUTES

const routes  = require('express').Router();
const logger  = require('../lib/logger')
const DATA_DIR = process.env.OPENSHIFT_DATA_DIR
var fs   = require('fs'),
    loki = require('lokijs'),
    options = { autosave: true, autoload: true,
        autosaveInterval: 100, throttledSaves: false }

routes.get('/games/:gameid', (req, res) => {
    var gameID = req.params.gameid
    var db_path = DATA_DIR+'/'+gameID+'.json';
    var db = new loki(db_path, options)
    db.loadDatabase({}, function(){
        players = db.getCollection('players')
        if (!players){
            db.addCollection('players')
            res.status(200).json({
                gamename: gameID,
                players:  []
            });
            return
        } else {
            res.status(200).json({
                gamename: gameID,
                players:  players.data
            })
            return
        }
        res.status(400).json({
            error: true,
            msg: "Unable to load or parse db" });
    })
});

routes.put('/players/:gameid', (req,res) => {
    var gameID     = req.params.gameid,
        oldname    = req.body.oldname,
        newname    = req.body.newname,
        db_path    = DATA_DIR+'/'+gameID+'.json',
        db         = new loki(db_path,options)
    db.loadDatabase({}, function(){
        var players   = db.getCollection('players');
        var oldPlayer = players.findOne({'name': oldname})
        var newPlayer = players.findOne({'name': newname})
        if (newPlayer){
            res.status(400).json({success: false, name: oldname,
            msg: 'Player already exists'})
            return
        }
        if (oldPlayer) {
            oldPlayer.name = newname;
            players.update(oldPlayer)
        } else {
            if (newname==null || newname=="") {
                res.status(400).json({
                    success:false,
                    msg: "Name cannot be nulll"
                })
                return
            } else {
                players.insert({name: newname, score: 0, course: []});
            }
        }
        db.save();
        res.status(200).json({success: true, name: newname, msg: 'inserted'})
    })
});

routes.put('/score/:gameid/:player/:hole/:dir', (req,res)=> {
    var gameID  = req.params.gameid,
        player  = req.params.player,
        hole    = req.params.hole,
        dir     = req.params.dir,
        db_path = DATA_DIR+'/'+gameID+'.json',
        db      = new loki(db_path,options);
    db.loadDatabase({},function(){
        var players = db.getCollection('players');
        var p       = players.findOne({'name': player});
        if (!p){
            res.status(400).json({success: false, msg: player + "not found"})
            return
        }
        // Set the score if not set already
        if (!p.course[hole]){
            p.course[hole] = 0
        }
        if (dir === 'up'){
            //Increasing the score
            p.course[hole] += 1
        }
        if (dir === 'down' && p.course[hole] > 0){
            //Decrement only when we can
            p.course[hole] -= 1
        }
        players.update(p)
        db.save();
        res.status(200).json({success: true, score: p.score, hole: p.course[hole], msg: 'Score Updated'})
    })
    //res.status(200).json({success: true, score: msg: 'Score Updated'})
});


module.exports = routes;