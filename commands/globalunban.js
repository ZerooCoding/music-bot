
module.exports = {
    name: "globalunban",
    description: "Globally Unbans a member",
   async execute(message, args, client) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You don\'t have access to this command.');
        let user = await client.users.fetch(args[0])
        if(!user)return message.channel.send('Please provide a user id to unban.');
        server = client.guilds.cache.array();
        let reason = args.slice(1).join(" ");
        
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have permission to perform this command. Please make sure I have the permission \' BAN MEMBERS \' and then try again.');

        message.delete();
        if(reason){
        try{
            message.guild.members.unban(user, {reason: reason})
            message.channel.send(`${user} has been unbanned by ${message.author} for \'${reason}\'`)
        } catch(err){
            console.log(err);
        }
           }
           else{
            try{
                for(var n in server){
                server[n].members.unban(user)
                server[n].channels.cache.find(c => c.name == 'bot').send(`${user} has been unbanned by ${message.author}`)
                }
            } catch(err){
                console.log(err);
            }
           }
        }
    }
