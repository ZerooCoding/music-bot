const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
  name:"warn",
  description:"Warn a person",
  async execute(message, args, client){
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You cannot run this command`);
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send(`You didn't specify a correct user.`);
    let reason = args.slice(1).join(" ");
    if(!reason) return message.channel.send(`You didn't provide a reason.`);
    let d = new Date(); 
    let date = d.toUTCString();
    function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
let warnid = makeid(10)
let warnids = db.get(`warnid`)
for(var n in warnids){
  if(warnids[n] == warnid) warnid = makeid(10)
}
db.push(`warnid`, warnid)
    const warns = await db.fetch(`warn_${message.guild.id}_${user.id}`) || 1;
    db.add(`warn_${message.guild.id}_${user.id}`, 1)
    db.push(`warns_${message.guild.id}_${user.id}`, `**${warnid}** - ${reason} - ${message.author} - ${date}`)
    const warnembed = new Discord.MessageEmbed()
    .setColor(`ORANGE`)
    .setTitle(`Warned ${user.username}#${user.discriminator}`)
    .setDescription(`${reason} \n\n They now have been warned **${warns}** times`)
    .setFooter(date)
    message.channel.send(warnembed);
    const warnembed2 = new Discord.MessageEmbed()
    .setColor(`ORANGE`)
    .setTitle(`You were Warned!`)
    .setDescription(`${reason} \n\n by ${message.author}`)
    .setFooter(`Warned at ${date}`);
    user.send(warnembed2);
  }
}