function err400(response, message){
	response.status(400).end(message); //ends connection and sends message back to client
	generalErrorHandling(response, message);
}

function err500(response, message){
	response.status(500).end("Internal Server Error: Renaming file failed. Please contact support with detailed circumstances on how you triggered this error.");
	generalErrorHandling(response, message);
}

function generalErrorHandling(response, message){
	if(response.finished === true){
		console.log("ERR400: Connection was closed with status 400 and error message: ");
		console.log("'" + message + "'");
		console.log();
	}
	else{
		console.log("ERR400: WARNING: Connection with status 400 was not closed");
	}
}