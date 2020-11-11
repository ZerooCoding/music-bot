
module.exports = {
    name: "softban",
    description: "Soft bans a member",
   async execute(message, args, client) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You don\'t have access to this command.');
        let user = await message.mentions.users.first();
        if(!user) return message.channel.send('Please provide a user id to softban.');

        let reason = args.slice(1).join(" ");
        
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have permission to perform this command. Please make sure I have the permission \' BAN MEMBERS \' and then try again.');

        message.delete();
        if(reason){
        try{
            user.send(`You have been soft banned in ${message.guild.name}`)
            message.guild.members.ban(user,  {reason: reason, days: 7})
            message.guild.members.unban(user, {reason: reason})
            message.channel.send(`${user} has been soft banned by ${message.author} for \'${reason}\'`)
        } catch(err){
            console.log(err);
        }
           }
           else{
            try{
                user.send(`You have been soft banned in ${message.guild.name}`)
                message.guild.members.ban(user, {days: 7})
                message.guild.members.unban(user)
                message.channel.send(`${user} has been soft banned by ${message.author}`)
            } catch(err){
                console.log(err);
            }
           }
        }
    }