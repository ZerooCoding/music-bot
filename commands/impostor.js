const Discord = require("discord.js");
module.exports = {
  name:"impostor",
  description:"Impasta",
  async execute(message, args, client){
    let user = message.mentions.users.first() || message.author;
    let name = user.username
    const embed = new Discord.MessageEmbed()
    .setColor(`YELLOW`)
    .setDescription(`。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${name}  was The Impostor.　 。　.

　　'　　　 0 Impostor remains 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`);
message.channel.send(embed)
  }
}