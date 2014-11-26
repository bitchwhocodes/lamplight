var express = require('express');
var router = express.Router();
var twilio = require('twilio');



/*post*/
router.post('/', twilio.webhook('44b4af81151ee477a0926f1c3b54ac3f', { host:'lamplight.azurewebsites.net', protocol:'http' }), function(req, res){
 if (req.body.Body == "light it up") {
   console.log("verified number!");
 } else {
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