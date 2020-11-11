
module.exports = {
    name: "rate",
    aliases: ['r'],
    description: "Rates a user",
    execute(message, args, client) {
      let number = Math.floor(Math.random()*11);
      if (!args[0]){
          return message.channel.send(` I rate you **${number}/10**`);
      }
      else {
        let user = message.mentions.users.first();
        if(user){ 
          message.channel.send(`I rate ${user.username} **${number}/10**.`);
        }else{
        if(!user){
          let author = message.author;
            var use = args[0];
            var mem = client.users.cache.get(use);
            if(message.guild.member(mem)){
               return message.channel.send(`${author} I rate ${mem.username} **${number}/10**`);
            }
            else {
              return message.channel.send(`${author} Please mention a user to rate`);
              }
           } else {
           return message.channel.send(`${author} Please mention a user to rate`);
           }
        }
         
      }
    }
  };
  