exports.run = async (client, message, args) => {
    facks = args.join(" ").split(";");
    phrase = facks[0];
    q = facks[1];
    a = facks[2];

    if (client.faq.get(phrase)) {
        client.faq.delete(phrase);
        message.channel.send("Deleted!");
    } else {
        message.channel.send("That FAQ doesn't exist!");
    };

};

exports.conf = {
  enabled: true,
  guildOnly: true,
    allowedAnywhere: false,
  aliases: ["rf"],
  permLevel: 2
};

exports.help = {
  name: "removefaq",
  category: "Miscellaneous",
  description: "Remove a FAQ",
  usage: "!removefaq <FAQ>"
};