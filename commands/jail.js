const Canvacord = require('canvacord');
const Discord = require('discord.js')
module.exports = {
  name:"jail",
  description:"jail a person",
  async execute(message, args, client){
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    if(!user) return message.channel.send(`Could not find a user.`);
    let avatar = user.displayAvatarURL({dynamic : true, format:'png'});
    let image = await Canvacord.Canvas.jail(avatar);
   let attachment = new Discord.MessageAttachment(image, "jail.png");
    message.channel.send(attachment);

  }
}