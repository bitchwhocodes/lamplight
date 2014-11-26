var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var Spark = require("spark-io");





router.post('/', twilio.webhook(process.env.TWILIO, { host:'lamplight.azurewebsites.net', protocol:'http' }), function(req, res){
 if (req.body.Body == "light it up") {
  
    var resp = new twilio.TwimlResponse();
 	
 	res.type('text/xml');
 	console.log(process.env.SPARK_TOKEN);
 	
 	//resp.message("shit this works turning on"+board);
	
	var board = new Spark({
  		token: process.env.SPARK_TOKEN,
  		deviceId: process.env.SPARK_ID,
  		port:process.env.port
	});

	console.log(board);

board.on("ready", function() {
	console.log("ready");
		this.pinMode("D0", this.MODES.OUTPUT);
		this.digitalWrite("D0",1);

		
	});
res.send(resp.toString());
	
  //res.render('index', { title: 'got the damn text' });
 }

 if(req.body.Body == "turn it off"){
	var resp = new twilio.TwimlResponse();
 	resp.message("shit this works turning off");
 	res.type('text/xml');
 	res.send(resp.toString());
 	var board = new Spark({
  		token: process.env.SPARK_TOKEN,
  		deviceId: process.env.SPARK_ID
	});


	board.on("ready", function() {
		this.pinMode("D0", this.MODES.OUTPUT);
		
  		this.digitalWrite("D0", 0);
	});

 }
 
});


module.exports = router;

/*

function sendMessage(res, message) {
 var resp = new twilio.TwimlResponse();
 resp.message(message);
 res.type('text/xml');
 res.send(resp.toString());
}


module.exports = router;
*/