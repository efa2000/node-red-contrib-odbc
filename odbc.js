module.exports = function(RED) {

	var db = require("odbc")();

	function Connection(config) {
	    RED.nodes.createNode(this, config);
	    
	}
  	RED.nodes.registerType("Connection", Connection, {
    credentials: {
        username: {type:"text"},
        password: {type:"password"}
    }
 });

  	function odbc(config) {
	    RED.nodes.createNode(this, config);
	}
  	RED.nodes.registerType("ODBC", odbc);
}