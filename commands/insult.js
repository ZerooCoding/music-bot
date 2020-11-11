const fetch = require('node-fetch');
const unirest = require('unirest');
module.exports = {
    name: "insult",
    description: "Sends a random fact.",
    async execute(message, args, client){
        var req = unirest('GET', 'https://insult.mattbas.org/api/insult');

		let member = message.mentions.users.first();
		if (!member) return message.reply('Dude you had to include one more thing and you screwed that up...');

		req.end((res) => {
			if (res.error) {
				errorMessage();
				throw new Error(res.error);
			}
			try {
				var insult = res.raw_body.toLowerCase();
				message.channel
					.send('**' + member.username + '**, ' + insult + '.')
					.then((e) => {
						e.react('🔥');
					})
					.catch((err) => {
						console.log(err);
					});
        } catch(err){
            console.log(err);
        }
    })
    }
}
