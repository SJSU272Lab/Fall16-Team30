var Botkit 			= require('botkit');
var express 		= require('express');
var bodyParser 		= require('body-parser');
var cmd 			= require('node-cmd');
var child_process 	= require('child_process');
var fs 				= require('fs');
var app 			= express();
var port 			= process.env.PORT || 1237;

app.use(bodyParser.urlencoded({
	extended : true
}));

app.get('/', function(req, res) {
	res.status(200).send('We welcome you on port number: ' + port);
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});

var schedule = "";
var numberIcons="";
var controller = Botkit.slackbot({
	debug : false
});

controller.spawn({
	token : 'xoxb-111672613090-Kv1eFDh6SjafP0UY4SNV3Yme'
}).startRTM();

controller
		.hears(
				'.*',
				[ 'direct_message', 'direct_mention', 'mention' ],
				function(bot, message) {
					console.log(message.match[0]);
					var reply = '';
					if (message.match[0].search('add') > -1 ) {
						schedule += '\r' + message.match[0].substring(4);
						reply = 'Alright ! I have updated your schedule';					
					}  else if(message.match[0]==='show schedule') {
						reply  = schedule;
					}
					if (reply !== '') {
						var reply_with_attachments = {
							'username' : 'Scheduler',
							'attachments' : [ {
								'fallback' : 'To be useful, I need you to invite me in a channel.',
								'text' : reply,
								'color' : '#7CD197'
							} ],
							'icon_url' : 'https://www.magentocommerce.com/magento-connect/media/catalog/product/cache/9/image/468x300/9df78eab33525d08d6e5fb8d27136e95/c/r/cron-scheduler-icon_1.jpg'
						};
						bot.reply(message, reply_with_attachments);
						reply = '';
					}
				});