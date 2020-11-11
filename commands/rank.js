const canvacord = require("canvacord");
const db = require('quick.db');
const Discord = require('discord.js')
module.exports = {
    name:"rank",
    description: "Gives rank of a person",
    async execute(message, args, client){
  try{
   // console.log('this works');
      let rank = 0;
        var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0;
        var currentxp = db.startsWith(`guild_${message.guild.id}_xptotal`, {sort: ".data"})
        let xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
        var xpNeeded = level * 500 + 500;
        console.log('This works too')
        for(var a in currentxp){
          let i = parseInt(a);
          //console.log(currentxp[i].ID.split('_')[3]);
          if(currentxp[i].ID.split('_')[3] == user.id){
            rank = i + 1;
          }
          if(i = 0) return message.channel.send(`Well looks like you haven't chatted with anyone.`) && console.log('nope');
        }
        console.log('Working so far')
        const img = new canvacord.Rank()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setStatus(user.presence.status)
            .setCurrentXP(xp)
            .setLevel(level)
            .setRequiredXP(xpNeeded)
            .setRank(rank)
            .setAvatar(user.displayAvatarURL({ format: "png"}));
        img.build().then(data => {
          //console.log(`Working`)
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        //console.log(`well`)
        message.channel.send(attachment);
        //console.log(`Woops`)
        })
    }catch(err){
      //console.log(`Not Working`)
      console.log(err);
    }  //return message.channel.send(new Discsord.messageAttachment(img, "rank.png"))
    }
}