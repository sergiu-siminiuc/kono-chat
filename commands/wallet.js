exports.run = async (client, message, args) => {
    const user = message.mentions.users.first();
    const scoreMoney = client.money.get(message.author.id).money;
  
  
     if (!user) {
      message.channel.send({embed: {
      "description" : `You have **${scoreMoney} KC!**`,
      "color": 65280,
      "thumbnail": {
        "url": "https://cdn.discordapp.com/attachments/187785719933173761/374349026008629248/KonoChip45x.png"
      },
        "author": {
        "name": `${message.author.username}'s Wallet`,
        "icon_url": `${message.author.displayAvatarURL}`
       }}});
   } else {
     const userMoney = client.money.get(message.mentions.users.first().id).money;
     message.channel.send({embed: {
     "description" : `${user.username} has **${userMoney} KC!**`,
     "color": 65280,
     "thumbnail": {
       "url": "https://cdn.discordapp.com/attachments/187785719933173761/374349026008629248/KonoChip45x.png"
     },
       "author": {
       "name": `${user.username}'s Wallet`,
       "icon_url": `${message.author.displayAvatarURL}`
    }}});
   }
  };
  
  
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    allowedAnywhere: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "wallet",
    category: "User-focused",
    description: "Displays your current amount of currency",
    usage: "!wallet"
  };