const fetch = require('node-fetch');
module.exports = {
    name: "fact",
    description: "Sends a random fact.",
    async execute(message, args, client){
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const fact = await response.json();
        let r = fact.value;
        message.reply(r)
    }
}