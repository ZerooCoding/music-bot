const prefix = '.';
const channel = ['759412824208048148', '761586386443960361'];
module.exports = {
    name: "lockdown",
    description: 'Initiates lockdown',
    aliases: ['lk'],
    execute( message, args) {
        //let args = message.content.substring(prefix.length).split(" "); 
      
          if (!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply('You can\'t use this command!')
         channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
          if (args[0] === 'on') {
              channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.cache.get('757520948210696212'), {
                        SEND_MESSAGES: false
                    }).then(() => {
                      channel.setName(channel.name += `🔒`)
                  })
              })
              return message.channel.send('Locked all channels');
          } else if (args[0] === 'off') {
              channels.forEach(channel => {
                  channel.updateOverwrite(message.guild.roles.cache.get('757520948210696212'), {
                      SEND_MESSAGES: true
                  }).then(() => {
                      channel.setName(channel.name.replace('🔒', ''))
                  })
              })
              return message.channel.send('Unlocked all channels')
          }
        
      
}
    }