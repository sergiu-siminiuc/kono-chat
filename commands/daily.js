const moment = require('moment');

exports.run = async (client, message, args) => {
    data = client.money.get(message.author.id)

    if (data.lastDaily != moment().format('L')) { //Checking if lastDaily is the same as current date.
        data.lastDaily = moment().format('L') //swaps lastDaily with current date.
        data.money += 10;
        client.money.set(message.author.id, data)
        message.channel.send({embed: {
            "description" : `Kono-Chan gave ${message.author.username} **10 KC! You now have **${data.money} KC** in your wallet.`,
            "color": 65280,
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/187785719933173761/374349026008629248/KonoChip45x.png"
            },
            "author": {
                "name" : `Daily Reward`,
                "icon_url": `${message.author.displayAvatarURL}`
            }
        }});
    } else {
        message.channel.send("Come back tomorrow, silly!")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    allowedAnywhere: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "daily",
    category: "User-Focused",
    description: "Get your daily Kono Chips!",
    usage: "!daily"
  };