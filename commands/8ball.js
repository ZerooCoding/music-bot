const Discord = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name:"8ball",
    alisases: ["8b"],
    description: "Tells about your future.",
   async execute(message, args){
        if(!args[0]) return message.channel.send('You need to ask a question.');
        /*const options = ['My CPU says no', 'Baby maybe maybe ooh', 'Maybe....', 'My CPU says Yes!', 'Somebody once told me that this ain\'t true', 'Don\'t even try for it', 'My sources say no', 'My sources say YES', 'The odds of this happening is 0.00001%'];
        var response = options[Math.floor(Math.random() * options.length)];
        */
        const response = await fetch(`https://api.snowflakedev.xyz/eightball`)
        const json = await response.json();
        if(!json.response) return message.channel.send(`Whoops, something went wrong with the API`)
        var res = new Discord.MessageEmbed()
        .setColor(`BLUE`)
        .setDescription(args.slice(0).join(" "))
        .setTitle(json.response);
        message.channel.send(res);
    }
}