
module.exports = {
    name: "simp",
    description: "Tells simp % of a member",
    execute(message, args, client) {
      let number = Math.floor(Math.random()*101);
      if (!args[0]){
          return message.channel.send(`You are  **${number}%** simp.`);
      }
      else {
        let user = message.mentions.users.first();
        if(user){ 
          message.channel.send(`${user.username} is  **${number}%** simp.`);
        }else{
        if(!user){
          let author = message.author;
            var use = args[0];
            var mem = client.users.cache.get(use);
            if(message.guild.member(mem)){
               return message.channel.send(`${mem.username} is **${number}%** simp.`);
            }
            else {
              return message.channel.send(`${author} Please mention a user for simp rate.`);
              }
           } else {
           return message.channel.send(`${author} Please mention a user for simp rate.`);
           }
        }
         
      }
    }
  };
  