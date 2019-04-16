exports.run = async (client, message, args) => {
    message.delete(2000)
    suggestion = message.toString();
    suggestion = suggestion.replace("!suggest ", "");

    client.channels.get(client.config.SUGGESTION_CHANNEL).send({embed: {
  "description" : `${suggestion}`,
  "color": 114336,
  "footer": {
    "text": `Suggested by: ${message.author.username + "#" + message.author.discriminator}`
  },
  "author": {
    "name": `Server Suggestion`,
    "icon_url": `${message.author.displayAvatarURL}`
    }}});
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
    allowedAnywhere: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "suggest",
  category: "System",
  description: "Send a server suggestion.",
  usage: "!suggest [suggestion]"
};