exports.action = function(data, callback){

	let client = setClient(data);
	info("Horoscope from:", data.client, "To:", client);
	horoscope (data, client, callback);
}

function horoscope (data, client) {

	const zodiaques = /(bélier|taureau|gémeaux|cancer|lion|vierge|balance|scorpion|sagittaire|capricorne|verseau|poissons)/gi;
	const match = data.action.rawSentence.match(zodiaques);
	const signe = match ? match[0] : null;
	
    if(!signe) {
	Avatar.speak(`je n'ai pas compris le signe que tu recherche!`, data.client, () => {
	Avatar.Speech.end(data.client);
	});
	return;
}
	fetch(`https://www.horoscope.fr/horoscopes/aujourdhui/${signe.toLowerCase().replace("é", "e")}`)
	.then(response => {
		if (response.status !== 200) {
			throw new Error(`Code erreur:${response.status}`);
		  }
		return response.text();
	})
	.then((html) => {
	const cheerio = require("cheerio");
	const $ = cheerio.load(html);
	const signeHoro = $('#__next > div > div.MainLayout_children__BSrlk > div.DailyHoroscopeContent_dailyHoroscopeContent__QrsY9.DailyHoroscopeContent_horoscopeContent__jI_SZ > div.DailyHoroscopeContent_contentWrapper__wemp0 > div.DailyHoroscopeContent_rightSide__Rme6b > section:nth-child(10) > div > p').text();
	if(signe) {
	Avatar.speak(`Horoscope pour le signe ${signe}, ${signeHoro}`, data.client, () => {
	Avatar.Speech.end(data.client);
	});
}
	})
	.catch (error => {
	 Avatar.speak(`Je n'arrive pas a accédé au site horoscope, ${error.message}`, data.client, () => {
	Avatar.Speech.end(data.client);
	})
	});
}

function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}