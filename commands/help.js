const { MessageEmbed } = require("discord.js");
const { SERVER_NAME } = require("../config.json");
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`${SERVER_NAME} Music Bot Help`)
      .setDescription("List of all commands")
      .setColor("#F8AA2A")
      .setFooter('This will self-destruct in 30seconds ');

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).then( (m) => {
      function myfunc(message){
      m.delete();
      }
      setTimeout(myfunc, 30000);
  }).catch(console.error);
  }
};
