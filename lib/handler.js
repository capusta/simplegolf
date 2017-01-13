
module.exports = {
    //DB handler.  Loads a particular DB
    find_or_create_db: function(db_name){
        global.logger.log("Querying " + db_name);
        var db = null;
        //TODO: create db if db does not exist
        return db;
    },
    //Collection handler: loags a specific collection type.
    // multiple collections allowed in one json db file
    load: function(db, collection) {
        global.logger.log("Querying " + collection);
        var c = null;
        //TODO:return: collection object
       return c;
    },
    //User cleaner: given a collection and a user, reset the user
    clear_user: function(collection,user){
        global.logger.log("Cleaning " + user + " from " + collection);
        var u = null;
        //TODO: clean a user i.e. reset all scores
        return u;
    }
};