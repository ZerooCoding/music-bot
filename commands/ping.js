const { execute } = require("./globan");

module.exports = {
    name: "ping",
    description: "Sends ping of the bot",
    async execute(message, args, client) {
    message.channel.send('Pong🏓').then(sent => {
        sent.edit(`🏓: ${sent.createdTimestamp - message.createdTimestamp}ms \n 💓: ${client.ws.ping}ms`);
        });
}
}