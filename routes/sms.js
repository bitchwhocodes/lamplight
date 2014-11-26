var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var Spark = require("spark-io");




/*post*/
router.post('/', twilio.webhook(process.env.TWILIO, { host:'lamplight.azurewebsites.net', protocol:'http' }), function(req, res){
 if (req.body.Body == "light it up") {
  
    var resp = new twilio.TwimlResponse();
 	resp.message("shit this works");
 	res.type('text/xml');
 	res.send(resp.toString());
 	var board = new Spark({
  		token: process.env.SPARK_TOKEN,
  		deviceId: process.env.SPARK_ID
	});


	board.on("ready", function() {
		this.pinMode("D0", this.MODES.OUTPUT);
		
  		this.digitalWrite("D0", 1);
	});
  //res.render('index', { title: 'got the damn text' });
 } if(req.body.Body == "turn if off "){
var resp = new twilio.TwimlResponse();
 	resp.message("shit this works");
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

 }else {
   console.log("Wrong number!");
  // sendMessage(res, "Invalid number!");
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