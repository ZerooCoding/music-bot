const passcode = 'Yashu2005';
module.exports ={
    name:"kill",
    description:"Restarts the bot",
    async execute (message, args,  client){
        if(!args[0]) return message.channel.send('You need to enter a passcode.');
        await message.delete();
        if (args[0] == passcode){
        message.channel.send('Restarting the bot.');
        setTimeout(()=> {

         try{
            process.exit();
        } catch(err){
            console.log(err)
        }
    }, 10000);
} else{
    message.channel.send('You need to enter a valid pass code, please contact **Udit#2027** for the passcode.');
}
}
}