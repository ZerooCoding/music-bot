const Discord = require('discord.js');
module.exports = {
    name: "ban",
    description: "Bans a member from the server",

    async execute ( message, args, client )  {
        if (!message.member.hasPermission(["BAN_MEMBERS"])){ return message.reply('You can\'t use this command!')
    } else {
        var user = message.mentions.users.first();
        var member;
        if(!user){ 
            var use = args[0];
            //Checking by id
            try {
                member = message.guild.members.cache.find(u => u.id === use);
            } catch(err) {
                member = null;
            }
            if(!member) {
                return message.reply('You didn\'t mention anyone!');
            }
            else{
            var server = client.guilds.cache.array();
            if(member){
                if(member.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot ban this person!');
            }
        
            var reason = args.slice(1).join(' ');
            if(!reason) return message.reply('You need to give a reason!');
            
            var log = new Discord.MessageEmbed()
            .setTitle('User Banned')
            .addField('User:', member, true)
            .addField('By:', message.author, true)
            .addField('Reason:', reason)
            for (var n in server) {
            server[n].channels.cache.find(c => c.name === 'idk').send(log);
            }
            var embed = new Discord.MessageEmbed()
            .setTitle('You were banned!')
            .setDescription(reason);
        
           try {
                await user.send(embed);
            } catch(err) {
                console.warn(err);
            }
            for (var i in server){
                server[i].members.ban(member, {reason: reason});
             }
            message.channel.send(`**${member}** has been banned by **${message.author}**!`);
            }
        }
        else {
            
        }
        
      
        
        try {
            member = await message.guild.members.fetch(user);
        } catch(err) {
            member = null;
        }
        var server = client.guilds.cache.array();
        if(member){
            if(member.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot ban this person!');
        }
    
        var reason = args.slice(1).join(' ');
        if(!reason) return message.reply('You need to give a reason!');
        
        var log = new Discord.MessageEmbed()
        .setTitle('User Banned')
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        for (var n in server) {
        server[n].channels.cache.find(c => c.name === 'bot').send(log);
        }
        var embed = new Discord.MessageEmbed()
        .setTitle('You were banned!')
        .setDescription(reason);
    
       try {
            await user.send(embed);
        } catch(err) {
            console.warn(err);
        }
        for (var i in server){
            server[i].members.ban(user, {reason: reason});
         }
        message.channel.send(`**${user}** has been banned by **${message.author}**!`);
    }
        }
    
        
    
}