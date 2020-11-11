const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name:"bal",
    description:"Economy",
    async execute(message, args, client){
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
        if(bal === null) bal = 0;
        let embed = new Discord.MessageEmbed()
        .setTitle(`Balance`)
        .setColor(`BLUE`)
        .setDescription(`${user} currently has $${bal}.`);
        message.channel.send(embed);
    }
}