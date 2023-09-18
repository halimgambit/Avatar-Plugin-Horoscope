exports.action = function(data, callback){

	var tblCommand = {
		
	belier : function() {Horoscope('belier',data, client);},
	taureau : function() {Horoscope('taureau',data, client);},
	gemeaux : function() {Horoscope('gemeaux',data, client);},
	cancer : function() {Horoscope('cancer',data, client);},
	lion : function() {Horoscope('lion',data, client);},
	vierge : function() {Horoscope('vierge',data, client);},
	balance : function() {Horoscope('balance',data, client);},
	scorpion : function() {Horoscope('scorpion',data, client);},				
	sagittaire : function() {Horoscope('sagittaire',data, client);},
	capricorne : function() {Horoscope('capricorne',data, client);},
	verseau : function() {Horoscope('verseau',data, client);},
	poissons : function() {Horoscope('poissons',data, client);}

	};

	function Horoscope (signe, data, client) {
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
