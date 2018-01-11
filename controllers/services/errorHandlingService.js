var exports = module.exports = {};

//closes connection and sends back a message
exports.clientErrorHandling = function(statusCode, message, response){
	response.status(statusCode).end(message);
	console.log("Connection to client was closed with status " + statusCode);
	console.log("Message to client send: '" + message + "'");
	console.log("");
}
