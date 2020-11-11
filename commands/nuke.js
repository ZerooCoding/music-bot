
module.exports = {
    name:"nuke",
    description:"Empties a channel",
    async execute(message, args, client){
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You don\'t have permission to perform this command.');
        let channels = message.mentions.channels.first();
        if(!message.mentions.channels.first()) channels = message.channel;
        message.channel.send(`Are you sure you want to nuke ${channels}? If you are sure, type \`y\` Else type \`n\`. Anything else would be considered as a no.`)
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });
        
        collector.on('collect',async m => {
            if (m.content === 'y'){
                const clone = await channels.clone()
                const pos = channels.position;
                channels.delete();
                clone.setPosition(pos);
                setTimeout(()=>{
            message.guild.channels.cache.find(c => c.name == channels.name).send(`Nuked the channel!`)
            message.guild.channels.cache.find(c => c.name == channels.name).send(`https://tenor.com/view/destory-eexplode-nuke-gif-6073338`);
        }, 10000);
        }else if (m.content === 'yes'){
        const clone = await channels.clone()
        const pos = channels.position;
        channels.delete();
        clone.setPosition(pos);
        setTimeout(()=>{
            message.guild.channels.cache.find(c => c.name == channels.name).send(`Nuked the channel!`)
            message.guild.channels.cache.find(c => c.name == channels.name).send(`https://tenor.com/view/destory-eexplode-nuke-gif-6073338`);
        }, 5000);
    } 
    else{
        channels.send(`Cancelled the nuke process.`)
    }
    collector.stop();
    });
    }
}