module.exports = {
    log: function(z) {
        if (global.debug == false) {
            return null;
        }
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        // Stupid json objects
        console.log(h+':'+m+':'+s+' - '+JSON.stringify(z,null,'  '));
    }
};