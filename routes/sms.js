var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var Spark = require("spark-io");




/*post*/
router.post('/', twilio.webhook('44b4af81151ee477a0926f1c3b54ac3f', { host:'lamplight.azurewebsites.net', protocol:'http' }), function(req, res){
 if (req.body.Body == "light it up") {
   console.log("verified number!");
    var resp = new twilio.TwimlResponse();
 	resp.message("shit this works");
 	res.type('text/xml');
 	res.send(resp.toString());
 	blinkSpark();
  //res.render('index', { title: 'got the damn text' });
 } else {
   console.log("Wrong number!");
  // sendMessage(res, "Invalid number!");
 }
 
});

function blinkSpark(){
	var board = new Spark({
  		token: process.env.sparktoken,
  		deviceId: process.env.sparkid
	});


	board.on("ready", function() {
		this.pinMode("D0", this.MODES.OUTPUT);
		var byte = 0;
  		this.digitalWrite("D0", (byte ^= 1));
	});

}
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