
const Discord = require('discord.js');

module.exports = (client, message) => {
  const settings = client.settings.get(message.guild.id);
  const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username + "#" + message.author.discriminator}`, message.author.displayAvatarURL)
    .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**
${message}`)
    .setColor(65280)
    .setTimestamp()
    .setFooter(`ID: ${message.author.id}`)

  client.channels.get(settings.modLogChannel).send({embed});
};