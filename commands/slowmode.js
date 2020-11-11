module.exports =  {
    name: "slowmode",
    description: "Sets slowmode in the channel.",
    execute (message, args){
        if(!message.member.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('You cannot use this command.');
        var time = parseInt(args[0]);
        if (time > 21600) return message.channel.send('Please provide a valid time between 1-21600 seconds.');
        if (!time){
            if(args[0] == 'off'){
                message.channel.setRateLimitPerUser(0);
                message.channel.send(`Slowmode has now been removed.`);
            }
            else{
                message.channel.send(`Please provide a valid time in seconds.`);
            }
        }
        else {
        message.channel.setRateLimitPerUser(time);
        message.channel.send(`Slowmode is now turned to ${time} seconds.`);
    }
}
}