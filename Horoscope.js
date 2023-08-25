exports.action = function(data, callback){

	var tblCommand = {
		
	belier : function() {return Horoscope('belier');},
	taureau : function() {return Horoscope('taureau');},
	gemeaux : function() {return Horoscope('gemeau');},
	cancer : function() {return Horoscope('cancer');},
	lion : function() {return Horoscope('lion');},
	vierge : function() {return Horoscope('vierge');},
	balance : function() {return Horoscope('balance');},
	scorpion : function() {return Horoscope('scorpion');},				
	sagittaire : function() {return Horoscope('sagittaire');},
	capricorne : function() {return Horoscope('capricorne');},
	verseau : function() {return Horoscope('verseau');},
	poissons : function() {	return Horoscope('poissons');}

	};

	function Horoscope (signe) {
	const cheerio = require("cheerio");
	fetch('https://www.idealvoyance.fr/horoscope-jour-'+ signe)
	.then(response => {
		if (!response.ok) {
		  throw Error(response.statusText);
		}
		return response.text();
	})
	.then((body) => {
	const $ = cheerio.load(body);
	const signeHoro = $('p.content').first().text();
	Avatar.speak(`Horoscope pour le signe ${signe}${' '}${signeHoro}`, data.client, () => {
	Avatar.Speech.end(data.client);
	});
	})
	.catch (function (error) {
	 Avatar.speak(`Je n'arrive pas a accédé au site, ${error}`, data.client, () => {
	Avatar.Speech.end(data.client);
	})
	});		
	}
	
	let client = setClient(data);
	info("Horoscope:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}


function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}
