const Discord = require('discord.js');
module.exports = {
    name: "attach",
    description: "attachment",
    async execute(message, args){
        //if(message.author.id !== '360064639175884800') return message.channel.send('You aren\'t allowed to run this command.') 
        let attachmentsArray = Array.from(message.attachments);
        if (message.attachments.size > 0){
            const embed = new Discord.MessageEmbed()
            .setImage(attachmentsArray[0][1].attachment);
            message.channel.send(embed)
        }else{
            message.channel.send('no attachment')
        }
            }
        }
    

  