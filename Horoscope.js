exports.action = function(data, callback){

	var tblCommand = {
	
	belier : function() {
		const Signe = Horoscope('belier')
		return Signe;
	},

	taureau : function() {
		const Signe = Horoscope('taureau')
		return Signe;
	},

	gemeaux : function() {
		const Signe = Horoscope('gemeaux')
		return Signe;		
	},

	cancer : function() {
		const Signe = Horoscope('cancer')
		return Signe;		
	},

	lion : function() {
		const Signe = Horoscope('lion')
		return Signe;				
	},
	vierge : function() {
		const Signe = Horoscope('vierge')
		return Signe;				
	},

	balance : function() {
		const Signe = Horoscope('balance')
		return Signe;						
    },

	scorpion : function() {
		const Signe = Horoscope('scorpion')
		return Signe;						
	},
						
	sagittaire : function() {
		const Signe = Horoscope('sagittaire')
		return Signe;	
	},
	
	capricorne : function() {
		const Signe = Horoscope('capricorne')
		return Signe;
	},
	
	verseau : function() {
		const Signe = Horoscope('verseau')
		return Signe;
	},
	
	poissons : function() {
		const Signe = Horoscope('poissons')
		return Signe;
	}

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
	Avatar.speak(`${'Horoscope pour le signe '}${signe}${' '}${signeHoro}`, data.client, () => {
	Avatar.Speech.end(data.client);
	});
	})
	.catch (function (error) {
	 Avatar.speak(`${"Je n'arrive pas a accédé au site, "} ${error}`, data.client, () => {
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