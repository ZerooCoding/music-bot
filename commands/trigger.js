const canvacord = require('canvacord');
const Discord = require('discord.js');
module.exports = {
    name:"trigger",
    description:"Triggers a user",
    async execute(message, args, client){
        let user = message.mentions.users.first() || message.author 
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
}