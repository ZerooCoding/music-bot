const Discord = require('discord.js');
module.exports = {
    name: "roll",
    description: "Rolls a dice",
    async execute( message ){
        let number = Math.floor(Math.random()*6) + 1;
        message.channel.send(`Rolling Dice...`).then((message) => {
            setTimeout(()=> { 
                message.edit(`Rolled **${number}**`);
            }, 3000);
      })
            }
        }
    

