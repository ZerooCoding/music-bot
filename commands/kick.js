    module.exports = {
        name: "kick",
        description: "kick a member",
        async execute(message, args, client) {
            const { member, mentions } = message

            const tag = `<@${member.id}>`

            if(
            !member.hasPermission('KICK_MEMBERS') ||
            !message.guild.me.hasPermission('KICK_MEMBERS')
            ) {    message.channel.send( `${tag} You do not have the right permissions to kick someone, if you think this is an error, please contact 'Udit Narayan#2614' on discord, or a member of staff.`)
        } else if ( member.hasPermission('KICK_MEMBERS') || message.guild.me.hasPermission('KICK_MEMBERS')) {
                        const target = message.mentions.members.first()
                        if (target) {
                            const targetMember = message.guild.members.cache.get(target.id)
                            targetMember.kick()
                            message.channel.send(`${tag} The user has been kicked.`)
                        }  if(!target) {message.channel.send(`${tag} Please specify a someone to kick.`);
                    }
                }
            }
        }
