const db = require("quick.db");
require("quick.db-prototypes")(db);
const Discord = require('discord.js');
module.exports = {
    name: "leaderboard",
    description:"Shows the leaderboard",
    async execute(message, args, client){
        let money = db.startsWith(`money_${message.guild.id}`, {sort: '.data'});
        let content ='';
        for(let i = 0; i < money.length; i++){
          let user = client.users.cache.get(money[i].ID.split('_')[2]);
          content += `**${i + 1}**. ${user} : $${money[i].data} \n`
        }
    const embed = new Discord.MessageEmbed()
    .setTitle(`Leaderboards`)
    .setDescription(content)
    .setColor('ORANGE');
    message.channel.send(embed);
}
}