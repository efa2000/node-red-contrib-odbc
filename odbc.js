module.exports = function(RED) {
	"use strict";
	var mustache = require("mustache");
	var Pool = require("odbc").Pool

	function connection(config) {
	    RED.nodes.createNode(this, config);
	    this.cn = "";
	    if (config.driver!=""){
	    	this.cn = this.cn + "DRIVER="+config.driver + ";"
	    }
	    if (config.server!=""){
	    	this.cn = this.cn + "SERVER="+config.server + ";"
	    }
	    if (this.credentials.username!=""){
	    	this.cn = this.cn + "USER="+ this.credentials.username + ";"
	    }
   	    if (this.credentials.password != ""){
	    	this.cn = this.cn + "PASSWORD="+ this.credentials.password + ";"
	    }
	    this.cn = this.cn + config.other;
	    this.pool = new Pool();
	    var node = this;
/*	   	node.on('close',function(){
	   		node.pool.close(function(){});
	   	})
*/	}
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
	    this.pool = odbcCN.pool;
	    this.cn = odbcCN.cn;
	    this.outField = config.outField;
	    var node = this;
	    var b = node.outField.split(".");
        var i = 0;
        var r = null;
        var m = null;
        var rec = function(obj) {
            i += 1;
            if ((i < b.length) && (typeof obj[b[i-1]] === "object")) {
                rec(obj[b[i-1]]); // not there yet - carry on digging
            }
            else {
                 if (i === b.length) { // we've finished so assign the value
                     obj[b[i-1]] = r;
                     node.send(m);
                     node.status({});
                 }
                 else {
                     obj[b[i-1]] = {}; // needs to be a new object so create it
                     rec(obj[b[i-1]]); // and carry on digging
                 }
            }
        }
/*		node.on('input',function(msg){
			node.pool.open(node.cn, function(err, db){
		    	if (err){
		    		node.error(err);
		    		node.status({fill:"red",shape:"ring",text:"Error"});
		    		return;
		    	}*/

		node.pool.open(node.cn, function(err, db){
        	if (err) {
	    		node.error(err);
	    		node.status({fill:"red",shape:"ring",text:"Error"});
	    		db.close(function(){});
	    		return;
	    	}
			node.on('input', function(msg) {
		    	node.status({fill:"blue",shape:"dot",text:"requesting"});
		    	var query = mustache.render(node.query,msg);
		    	db.query(query, function (err, rows, moreResultSets){
	        		if (err) {
	        			node.error(err);
	        			node.status({fill:"red",shape:"ring",text:"Error"});
	        			db.close(function(){});
	        			return;
	        		}
	        		i = 0;
	        		r = rows;
	        		m = msg;
	        		rec(msg);
	        	});
		    });
		});
	}
  	RED.nodes.registerType("ODBC", odbc);
}