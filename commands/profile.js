exports.run = async (client, message, args) => {
    client.channels.get(client.config.LOG_CHANNEL).send({embed: {
    "color": 11406336,
    "timestamp": `${n}`,
    "footer": {
      "text": `ID: ${message.author.id}`
    },
      "fields": [
        {
          "name": `**Purged ${amount} messages**`,
      "value": `by ${user} in ${message.channel}`
        }
    ],
    "author": {
      "name": `${message.author.username + "#" + message.author.discriminator}`,
      "icon_url": `${message.author.avatarURL}`
    }}});
  };
  
  exports.conf = {
    enabled: false,
    guildOnly: false,
    allowedAnywhere: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "profile",
    category: "User-focused",
    description: "Displays a user's profile information",
    usage: "profile <user>"
  };