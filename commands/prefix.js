const db = require('quick.db')
module.exports = {
  name:"prefix",
  description:"Set a custom prefix for the server",
  async execute(message, args, client){
    if(!message.member.hasPermission('MANAGE_SERVER')) return message.reply(`You cannot use this command`);
    let prefix = args.slice(0).join(" ")
    await db.set(`prefix_${message.guild.id}`, prefix)
    return message.channel.send(`Set the prefix for the server to \`${prefix}\``);
  }
}