exports.run = async (client, message, args) => {
    const msg = await message.channel.send("Ping?");
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    allowedAnywhere: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "ping",
    category: "Miscellaneous",
    description: "It... like... pings. Then Pongs. And it\'s not Ping Pong.",
    usage: "ping"
  };