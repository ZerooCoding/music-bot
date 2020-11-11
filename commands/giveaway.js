const Discord = require("discord.js");
const ms = require("ms");
module.exports ={
    name: "giveaway",
    desription: "Creates a giveaway!",
    async execute(message, args, client){
        if(!args[0]) return message.channel.send('You didn\'t specify any time.');
        if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")) return message.channel.send('You didn\'t use the correct format. Use m(minutes), h(hour), d(day).');
        if(isNaN(args[0][0])) return message.channel.send('This is not a number, please use the correct format.');
        let channel = message.mentions.channels.first();
        if(!channel) return message.channel.send ('You didn\'t specify and channel');
        let prize = args.slice(2).join(" ");
        if(!prize) return message.channel.send('You haven\'t specified any prize for the winner.');
        message.channel.send(`Created a giveaway in ${channel}`);
        let guy = message.author;
        let embed = new Discord.MessageEmbed()
        .setTitle(`New Giveaway!`)
        .setDescription(`**${prize}**`)
        .addField('Hosted by:', message.author)
        .setTimestamp(Date.now()+ms(args[0]))
        .setFooter('Ends')
        .setColor('BLUE');
        try{
        let m = await channel.send(embed);
        
        m.react("🎉")
        setTimeout(()=> {
          //  if(m.reactions.cache.size==1|| m.reactions.cache.size==0){
            if(m.reactions.count <= 1) return channel.send('Not enough people reacted for the giveaway.');
            // if(m.reactions.cache.size==0) return channel.send('No one reacted for the giveaway.');
           // }else{
            let winner = m.reactions.cache.get("🎉").users.cache.filter(u=> !u.bot).random()
            embed.addField('Winner:', winner);
            m.edit(embed);
            channel.send(`Congrats ${winner}, you won **${prize}** hosted by ${guy}.`)
         } , ms(args[0]));
    }catch(e){
        console.log(e);
        message.channel.send(`I don\'t have perms to post in ${channel}.`)
    }
}
}