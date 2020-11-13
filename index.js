//const pm2 = require('pm2')


const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX, SERVER_NAME } = require("./config.json");
const createCaptcha = require("./commands/captcha");
const fs = require('fs').promises;
const db = require('quick.db');
const Canvas = require("discord-canvas");
const Captcha = require("./node_modules/@haileybot/captcha-generator");
const keepAlive = require('./server1');
const { Intents } = require("discord.js");
const client = new Client({ disableMentions: "everyone", restRequestTimeout: 30000 }, { ws: { intents: Intents.ALL } });

keepAlive();
client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


client.on("ready", () => {
  console.log(`\n${client.user.username} ready!`);
  client.user.setActivity(`Over ${client.users.cache.size} members. Devil Sinners`, { type : 'WATCHING' });
 setTimeout(async () => {
      const subReddits = ["dankmeme", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
        
        const img = await randomPuppy(random);

        const memeembed = new Discord.MessageEmbed()
        .setAuthor('Udit\'s Music Bot')
        .setImage(img)
        .setTitle(`Meme from r/${random}`)
        .setColor('RANDOM')
        .setURL(`https://reddit.com/r/${random}`);
        client.channels.cache.get('722309754587840543').send(memeembed);
    }, 600000)
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);


const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}
/*
client.on("guildMemberAdd", async (member) => {
  try{
  let captcha = new Captcha()
  
  const channel = await member.createDM();
  
  if(!channel) {
   return console.log(member.guild.name + " Please Create channel with name verify")
  }
  
  const vrole = member.guild.roles.cache.find((x) => x.name === "non-verified")
  
    if(!vrole) {
   return console.log(member.guild.name + " Please Create role with name 'non-verified'")
  }
  
  member.roles.add(vrole)
  
  const verifycode = await channel.send("Please Type The Given Code For Verification",new Discord.MessageAttachment(captcha.PNGStream, "captcha.png"))
                                        
  let collector = channel.createMessageCollector(m => m.author.id === member.id)
  
  collector.on("collect", m => {
    if(m.content.toUpperCase() === captcha.value) {
     m.delete()
      verifycode.delete()
      member.roles.remove(vrole)
      member.roles.add('721972396428623914');
      return member.send("You have been verified.")
    } else if(m.content.toUpperCase() !== captcha.value) {
      member.send("You gave wrong code, so you can apply again by joining server again")
      verifycode.delete()
      m.delete()
      
      setTimeout(function() {
              member.kick()
      }, 10000)
        
    } else {
      verifycode.delete()
    }
    
  })
} catch(e){
  member.guild.channels.cache.get('444438197079113739').send(`${member} Please allow private messages from this server and rejoin if you want to get access to the channels.`);
}
  
  });
client.on('guildMemberAdd', async member1 => {
  const image = await new Canvas.Welcome()
  .setUsername(member1.user.username)
  .setDiscriminator(member1.user.discriminator)
  .setMemberCount(member1.guild.members.cache.size)
  .setGuildName(member1.guild.name)
  .setAvatar(member1.user.displayAvatarURL({dynamic : false, format:"png"}))
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")
  .toAttachment();
  const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcomer.png");
  member1.guild.channels.cache.get('444438197079113739').send(attachment);
});

client.on('guildMemberRemove', async member => {
  const image = await new Canvas.Goodbye()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(member.guild.members.cache.size)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({dynamic : false, format:"png"}))
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")
  .toAttachment();
   
const attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
member.guild.channels.cache.get('444438197079113739').send(attachment);
})

*/

client.on("message", async (message) => {
  if (message.author.bot) return;  
  let id = await db.get(`chat_${message.guild.id}`)
  if (message.channel.id !== id) return;
      message.channel.startTyping();
      const response = await fetch(`https://api.snowflakedev.xyz/chatbot?message=${encodeURIComponent(message.content)}&name=${encodeURIComponent(client.user.username)}&gender=MALE&user-${message.author.id}`)
      const json = await response.json();
      message.channel.send(json.message);
      return message.channel.stopTyping(true);
});
client.on("message", async (message) => {
  if (message.author.bot) return;
 /* let blacklisted = ['absolutely something no one would type'];
  let foundInText = false;
  for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
  if (foundInText) {
    let id = message.author.id;
    let messagedel = message.content;
    let channelid = message.channel.id;
    message.delete();
    let mesembed = new Discord.MessageEmbed()
    .setAuthor('Infinite Network Bot')
    .setTitle('Blacklisted Word')
    .setDescription('A user sent a blacklisted word')
    .addFields(
      { name: 'User ID', value:`<@${id}>` },
      { name: 'Text Content', value: `${messagedel}`},
      { name: 'Channel', value:`<#${channelid}>`},
    );
    
   client.channels.cache.find(c => c.name === "baat-cheet🖤").send(mesembed);
  }*/
  xp(message);
  if(message.mentions.users.first() == client.user) return message.channel.send('Uh No.')
 
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});
function xp(message) {
  if(!message.guild) return;
  const random = Math.floor(Math.random() * 10) + 15;
  db.add(`guild_${message.guild.id}_xp_${message.author.id}`, random);
  db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, random);
  var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
  var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
  var xpNeeded = level * 500
  if(xpNeeded < xp){
    var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1);
    db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);
    message.channel.send(`${message.author}, you have levelled up to ${newLevel}`)
  }
}