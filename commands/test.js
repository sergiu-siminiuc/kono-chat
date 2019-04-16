exports.run = async (client, message, args) => {
    console.log(client.points.get("187784950995615753"))
    console.log(client.points.get("373884396920504321"))
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