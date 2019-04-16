exports.run = async (client, message, args) => {
    facks = args.join(` `).split(`;`);
    phrase = facks[0];

    message.channel.send(`${client.faq.keyArray().join(`, `)}`)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
    allowedAnywhere: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "listfaq",
  category: "Miscellaneous",
  description: "list FAQ commands",
  usage: "!listfaq"
};