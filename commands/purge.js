exports.run = async (client, message, args) => {
    var d = new Date();
    var n = d.toISOString();

    const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 client.channels.get(client.config.LOG_CHANNEL).send({embed: {
 "color": 11406336,
 "timestamp": `${n}`,
 "footer": {
     "text": `ID: ${message.author.id}`
 },
     "fields": [
         {
             "name": `**Purged ${amount} messages**`,
     "value": `by ${user} in ${message.channel}`
         }
 ],
 "author": {
     "name": `${message.author.username + "#" + message.author.discriminator}`,
     "icon_url": `${message.author.displayAvatarURL}`
 }}});
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});


    client.channels.get(client.config.LOG_CHANNEL).send({embed: {
  "color": 11406336,
  "timestamp": `${n}`,
  "footer": {
    "text": `ID: ${message.author.id}`
  },
    "fields": [
      {
        "name": `**Purged ${amount} messages**`,
        "value": `In ${message.channel}`
      }
    ],
  "author": {
    "name": `${message.author.username + "#" + message.author.discriminator}`,
    "icon_url": `${message.author.displayAvatarURL}`
    }}});
    }
exports.conf = {
  enabled: true,
  guildOnly: false,
    allowedAnywhere: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "purge",
  category: "System",
  description: "Purges a defined amount of messages all together, or from a specific user.",
  usage: "!purge [number] [@user(optional)]"
};