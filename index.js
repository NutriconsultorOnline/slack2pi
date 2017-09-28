var five = require("johnny-five");
var Raspi = require("raspi-io");
var songs = require("j5-songs");

// Create the Raspberry Pi Board using the Raspi library,
var board = new five.Board({
  io: new Raspi()
});

// Songs for success/failure
var marioSong 	= songs.load("mario-fanfare");
var funeralSong = songs.load("starwars-theme");

// Declaring components on GPIOs
// Here we use the Physical Pin Names of the Raspberry GPIOs
// You can see more information about the model of your raspberry here: https://github.com/nebrius/raspi-io/wiki/Pin-Information
var greenLed 		= new five.Led("P1-11");
var redLed 			= new five.Led("P1-12");
var piezoBuzzer 	= new five.Piezo("P1-7");

// Declare of RealTimeClient, ClientEvents and RealTimeEvents
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

// Here is where you need to use your bot token that slack provided after creating it.
var bot_token = process.env.SLACK_BOT_TOKEN || '';

// We create the connection to the RealTimeClient with the Bot as the user.
var rtm = new RtmClient(bot_token);

// When the board is ready execute the code...
board.on("ready", function() {

	// Turning off the leds in case they remain on for some reason.
	redLed.off();
	greenLed.off();
	
	// You need to wait for the client to fully connect before you can read messages
	rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
		// Here we check that the message comes from a bot, in this case the bot that sent that message was the Slack App
		// and we check that it was sent from a specific bot using his id
		if(message.subtype == 'bot_message' && message.bot_id == 'BOT_ID_HERE') {
			if(message.attachments && message.attachments.length) {
				var build_result = /^\*(.+)\*/.exec(message.attachments[0].text);
				if(build_result) {
					redLed.off();
					greenLed.off();
					if(build_result[1] == 'success') {
						greenLed.on();
						greenLed.blink();
						redLed.stop();
						redLed.off();
						piezoBuzzer.play(marioSong);
					} else if(build_result[1] == 'failure') {
						redLed.on();
						redLed.blink();
						greenLed.stop();
						greenLed.off();
						piezoBuzzer.play(funeralSong);
					}
				}
			}
		}
		console.log('Message:', message);
	});
	
	// Now we start the client
	rtm.start();
});