const Discord = require("discord.js");
const db = require('quick.db')
module.exports = {
    name: "eval",
    description: "Evalutes javascript code",

    execute(message, args, client) {
       if (message.author.id !== '360064639175884800') return message.channel.send('```You aren\'t allowed to use this command!```');
        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
      
       try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
}