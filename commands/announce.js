exports.run = async (client, message, args) => {
    announcement = args.join(" ")
  
    message.channel.send(announcement);
    message.delete(1000)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    allowedAnywhere: true,
    aliases: ["a"],
    permLevel: 2
  };
  
  exports.help = {
    name: "announce",
    category: "Admin",
    description: "Lets you announce things as the bot.",
    usage: "!announce <message>"
  };