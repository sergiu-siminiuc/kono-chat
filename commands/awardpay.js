exports.run = async (client, message, args) => {
    var d = new Date();
    var n = d.toISOString();
    data = client.money.get(message.author.id)

    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) return message.reply('Must specify an amount to award!');
    if (!amount && user) return message.reply('Must specify a user and amount to award!');
    if (user && amount) {
        data.money += amount;
        client.money.set(user.id, data)
        message.channel.send(`Hey ${user}! Here's **${amount} KC!**`);
    }

    client.channels.get(message.settings.modLogChannel).send({embed: {
        "color" : 9984,
        "description" : `**Awarded ${user} ${amount} KC**`,
        "timestamp" : `${n}`,
        "footer" : {
            "text" : `ID: ${message.author.id}`
        },
        "author" : {
            "name" : `${message.author.username + "#" + message.author.discriminator}`,
            "icon_url" : `${message.author.displayAvatarURL}`
        }
    }});
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    allowedAnywhere: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: "awardpay",
    category: "User-Focused",
    description: "Award a user with KC.",
    usage: "!purge [number] @user"
}