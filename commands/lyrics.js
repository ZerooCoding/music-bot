const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const Genius = require("genius-lyrics");
const Client = new Genius.Client();
module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get lyrics for the currently playing song",
  async execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    let lyrics = null;
    if(!args.slice(0).join(" ")){
    if(!queue){
    if (!args.slice(0).join(' ')) return message.channel.send("You need to specify something.").catch(console.error);
    name = args.slice(0).join(" ")
    } 
    else{ 
      name = queue.songs[0].title.replace("[Official Video]", "").replace("(Official Video)", "").replace("(Official Audio)","").replace("Official","").replace("Vevo","").replace("VEVO","").replace("Official Vevo","").replace("(", "").replace(")", "").replace("HD","").replace("Official","").replace("Music","").replace("Video","") ;
    }
    } else{
      name = args.slice(0).join(" ")
    }
    try {
      const searches = await Client.songs.search(name);
      const firstSong = searches[0];
      lyrics = await firstSong.lyrics();
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      console.log(error);
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Lyrics")
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
