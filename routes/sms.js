var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var Spark = require("spark");


router.post('/', twilio.webhook(process.env.TWILIO, { host:process.env.HOST_NAME, protocol:'http' }), function(req, res){
 var callCommand = '';
 switch (req.body.Body.toLowerCase())
 {
 	case "forward":
 		callCommand ="forward";
 		break;
 	case "back":
 		callCommand ="back";
 		break;
 	case "left":
 		callCommand ="left";
 		break;
 	case "right":
 		callCommand ="right";
 		break;
 	case "stop":
 		callCommand = "stop"; 
 		break;
 }


if(callCommand.length)
{

	var resp = new twilio.TwimlResponse();
  	resp.message("Got it moving: "+callCommand);
 	res.type('text/xml');

 	Spark.login({ username: process.env.USER_NAME, password: process.env.PASS_WORD }, function(err, body) {
  		console.log('API call login completed on callback:', body);
	});

	Spark.callFunction(process.env.SPARK_ID,'setPosition',callCommand,function(err,data){
		console.log(err);
		console.log(data);
		console.log("testing");
		console.log("one more");
		res.send(resp.toString());

	});
}
/*

 if (req.body.Body == "show") {
  
    var resp = new twilio.TwimlResponse();
  	resp.message("YES SHOW IT");
 	res.type('text/xml');
 
 	
 	Spark.login({ username: process.env.USER_NAME, password: process.env.PASS_WORD }, function(err, body) {
  		console.log('API call login completed on callback:', body);
	});

	Spark.callFunction(process.env.SPARK_ID,'setPosition','ON',function(err,data){
		console.log(err);
		console.log(data);
		console.log("testing");
		console.log("one more");
		res.send(resp.toString());

	});

 }

 if(req.body.Body =="hide"){
	var resp = new twilio.TwimlResponse();
 	resp.message("RUN and HIDE");
 	res.type('text/xml');
 	
 	Spark.login({ username: process.env.USER_NAME, password: process.env.PASS_WORD }, function(err, body) {
  console.log('API call login completed on callback:', body);
});

    Spark.callFunction(process.env.SPARK_ID,'setPosition','OFF',function(err,data){
	    console.log(err);
	    console.log(data);
	    res.send(resp.toString());
    })

 }
 */
 
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