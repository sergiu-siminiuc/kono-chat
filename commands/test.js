exports.run = async (client, message, args) => {
  console.log(message.settings.modLogChannel)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    allowedAnywhere: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "test",
    category: "Miscellaneous",
    description: "Used for testing whatever Rinesi is working on at that moment.",
    usage: "test"
  };