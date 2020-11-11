const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('parse-ms');

module.exports = {
    name:"daily",
    description:"Daily Money",
    async execute(message, args, client){
        let user = message.author;
        let timeout = 86400000;
        let amount = 1000;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));

            return message.channel.send(`You've already recieved your daily award. Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m, ${time.seconds}s again.`);
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            message.channel.send(`Successfully added ${amount} to your bank account.`);
        }
    }
}