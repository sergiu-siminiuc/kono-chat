exports.run = async (client, message, args) => {
    message.channel.send(`http://www.ripme.xyz/#` + args.join("%20"));
};

exports.conf = {
enabled: true,
guildOnly: false,
allowedAnywhere: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: "rip",
category: "Miscellaneous",
description: "RIP\'s someone.",
usage: "rip <user>"
};