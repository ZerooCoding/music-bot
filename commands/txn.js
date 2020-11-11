const db = require('quick.db');
module.exports = {
    name:"verify",
    description:"verify txn",
    async execute(message, args, client){
        const txn = args[0];
        const verify = await db.fetch(`paypal`);
        for (var n in verify){
            if (txn !== verify[n]){
                const fetch = db.fetch(`txnid`);
                for(var i in fetch){
                    if (txn == fetch[i]) return;
                }
                message.channel.send(`Verified txn ${txn}`);
                db.push(`txnid`, txn);
            } else {
                message.channel.send(`${txn} has already been verified.`);
            }
        }
    }
}