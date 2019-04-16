exports.run = async (client, message, args) => {
    facks = args.join(" ").split("|");
    phrase = facks[0]
    q = facks[1];
    a = facks[2];

    if (client.commands.get(phrase) || client.commands.get(client.aliases.get(phrase))) {
        message.channel.send("That commands is reserved, try another!");
    } else if (client.faq.get(phrase)) {
        message.channel.send("Already exists!");
    } else {
        client.faq.set(phrase, {question: q, answer: a});
        message.channel.send(`Added FAQ. Call it with !${phrase}`);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: true,
        allowedAnywhere: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: "addfaq",
    category: "Miscellaneous",
    description: "Add a FAQ",
    usage: "!addfaq shorthand(All lowercase on shorthand please);question;answer"
};