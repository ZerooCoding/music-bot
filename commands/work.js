const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name:"work",
    description:"Work for money",
    async execute(message, args, client){
        let timeout = 3600000;
        let user = message.author;
      let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);
      if(author !== null && timeout - (Date.now() - author) > 0){
          let time = ms(timeout - (Date.now() - author));
          return message.channel.send(`You cannot work again for ${time.minutes}m and ${time.seconds}s`);
      } else{
          let amount = Math.floor(Math.random() * 1000) + 1;
          db.add(`money_${message.guild.id}_${user.id}`, amount)
          db.set(`worked_${message.guild.id}_${user.id}`, Date.now())

          message.channel.send(`${user}, you worked and earned $${amount}`);
      }
    }
}