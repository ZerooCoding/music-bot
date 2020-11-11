 const Discord = require('discord.js');
 const request = require('node-superfetch');


 module.exports = {
     name:"google",
     description:"Googles the internet for you",
     async execute(message, args, client){
         let googleKey = "AIzaSyA1cM1C3kFwR8uyTOSSDh7dThNzOIWEINc";
         let csx = "49223130713e974a2";
         let query = args.slice(0).join(" ");;
        let result;

        if(!query) return message.channel.send(` You didn't specify to search for anything.`);
        href = await search(query);
        if(!href) return message.channel.send(`Couldn't find what you were looking for.`);
        const embed = new Discord.MessageEmbed()
        .setTitle(href.title)
        .setDescription(href.snippet)
        .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
        .setURL(href.link)
        .setFooter(`Powered by Google`)
        .setColor(`BLUE`);

        return message.channel.send(embed);

        async function search(query){
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: googleKey, cx: csx, safe:"off", q: query
            });

            if(!body.items) return null;
            return body.items[0];
        }
     }
 }