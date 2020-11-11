const db = require('quick.db');
module.exports = {
  name:"chatid",
  description:"Sets channel id for chatting with the bot",
  async execute(message, args, client){
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You cannot use this command`)
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) message.channel.send(`Deleting curernt channel`)
    await db.set(`chat_${message.guild.id}`, channel.id);
    return message.channel.send(`Set chat id for bot to ${channel}`)
  }
}