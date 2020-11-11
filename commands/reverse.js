module.exports = {
    name: "reverse",
    description: "Reverses the message sent.",
    execute (message, args){
        var say = args.slice(0).join(" ");
        if(!say) return message.channel.send('You need to specify something to reverse it.');
        function reverseString(str) {
            return str.split("").reverse().join("");
        }
     message.channel.send(reverseString(say));
}
}