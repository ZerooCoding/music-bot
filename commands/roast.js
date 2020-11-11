const fetch = require('node-fetch')
module.exports = {
  name:"roast",
  description:"Roast a person",
  async execute(message, args, client){
    let user = message.mentions.users.first();
    if(!user) return message.channel.send(`No person specified to roast.`);
    const response = await fetch(`https://api.snowflakedev.xyz/roast`)
      const json = await response.json();
      message.channel.send(`${user}, \n${json.roast}`);
  }
}