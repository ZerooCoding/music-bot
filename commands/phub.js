const Discord = require("discord.js");
const canva = require('canvacord');
module.exports = {
  name:"phub",
  description:"I regret doing this",
  async execute(message, args, client){
    var msg = args.slice(0).join(" ");
    if (!msg) return message.reply('Please provide a valid message')
     if(message.mentions.users.first()){
      something = msg.replace(`<@!${message.mentions.users.first().id}>`, '')
      msg = message.mentions.users.first().username + something;
     }
    let username = message.author.username;
    let img = message.author.displayAvatarURL({dynamic: false, format :"png"});
    const image = await canva.Canvas.phub({username: username, message: msg, image: img})
    const attachment = new Discord.MessageAttachment(image, "phub.png");
    message.channel.send(attachment);
  }
}