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
	    this.outField = config.outField;
	    var node = this;
	    var b = node.outField.split(".");
        var i = 0;
        var m = null;
        var rec = function(obj, data) {
            i += 1;
            if ((i < b.length) && (typeof obj[b[i-1]] === "object")) {
                rec(obj[b[i-1]], data); // not there yet - carry on digging
            }
            else {
                 if (i === b.length) { // we've finished so assign the value
                     obj[b[i-1]] = data;
                     node.send(m);
                 }
                 else {
                     obj[b[i-1]] = {}; // needs to be a new object so create it
                     rec(obj[b[i-1]], data); // and carry on digging
                 }
            }
        }
	    this.on('input', function(msg){
	    	var query = mustache.render(node.query,msg);
	    	try {
				var result = node.db.querySync(query);
				console.log(result);
				m = msg;
				i = 0;
				rec(msg, result);
            } catch(err) {
                node.error(err.message);
            }
	    })


	}
  	RED.nodes.registerType("ODBC", odbc);
}