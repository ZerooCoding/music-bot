const math = require("mathjs");
const Discord = require("discord.js");

module.exports = {
    name: "math",
    description: "Does math for you",

    execute(message, args, client) {
        if(!args[0]) return message.channel.send('Please include a calculation.');

        let resp;
        try{
            resp = math.evaluate(args.join(' '));
        } catch(err) {
            return message.channel.send('Sorry, please include a valid calculation.');
        }

        const embed = new Discord.MessageEmbed()
        .setColor('Red')
        .setTitle('Math Calculation')
        .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
        .addField('Output', `\`\`\`js\n${resp}\`\`\``)

        message.channel.send(embed);
    }
}