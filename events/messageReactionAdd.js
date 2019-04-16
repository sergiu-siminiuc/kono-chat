const Discord = require('discord.js');

module.exports = (client, messageReaction, user) => {
  data = client.money.get(user.id)
  message = messageReaction.message.toString();

  if (message.includes("~Reward") && messageReaction.message.author.id == client.user.id) {
    data.money += 2;
    client.money.set(user.id, data)

  }
};