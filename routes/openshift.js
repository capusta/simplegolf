const routes = require('express').Router();
const logger = require('../lib/logger')

routes.get('/info/gen',(req,res) => {
    res.status(200).json({
            success: "true"
        })
    })

routes.get('/health', (req,res) => {
    //TODO: Make something more ??? not sure what to respond here
    // I suppose if this is invoked, then the app is up and running
    res.writeHead(200);
    res.end();
})
module.exports = routes
