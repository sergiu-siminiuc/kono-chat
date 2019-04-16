// This event executes when a new member joins a server. Let's welcome them!
const Discord = require('discord.js');

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user);
  //Sends the welcome message
  client.channels.get(settings.welcomeChannel).send(welcomeMessage);

  const embed = new Discord.RichEmbed()
    .setAuthor(`Member Joined`, member.user.displayAvatarURL)
    .setDescription(`${member.user} ${member.user.username}`)
    .setColor(65280)
    .setTimestamp()
    .setFooter(`ID: ${member.user.id}`)


  client.channels.get(settings.modLogChannel).send({embed});
};