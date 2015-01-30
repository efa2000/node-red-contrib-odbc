module.exports = function(RED) {
	"use strict";
	var mustache = require("mustache");

	function connection(config) {
	    RED.nodes.createNode(this, config);
	    this.cn = "DRIVER="+config.driver + ";"+"SERVER="+config.server + ";"+"USER="+ this.credentials.username + ";"+"PASSWORD="+ this.credentials.password + ";"+ config.other;
	    this.db = require("odbc")();
	    var that = this;
	    try {
//	    	that.log("CN:"+cn);
			var result = that.db.openSync(that.cn);
		}
		catch (e) {
			that.error(e.message);
		}
		if (result) that.log('ODBC connection to '+ config.server +' opened!');
		this.on('close', function(){
			that.db.closeSync();
			that.log('ODBC connection to '+ config.server +' closed!');
		})
	}
  	RED.nodes.registerType("ODBC-CN", connection, {
	    credentials: {
			username: {type:"text"},
			password: {type:"password"}
	    }
	});

  	function odbc(config) {
	    RED.nodes.createNode(this, config);
	    var odbcCN = RED.nodes.getNode(config.odbcCN);
	    this.query = config.query;
	    this.db = odbcCN.db;
	    var node = this;
	    this.on('input', function(msg){
	    	var query = mustache.render(node.query,msg);
	    	try {
				var rows = node.db.querySync(query);
            } catch(err) {
                node.error(err.message);
            }
	    })


	}
  	RED.nodes.registerType("ODBC", odbc);
}